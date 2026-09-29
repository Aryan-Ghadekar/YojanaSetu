import { Router } from 'express';
import multer from 'multer';
import { supabaseAdmin } from '../lib/supabaseAdmin.js';
import { requireAuth } from '../middleware/auth.js';
import { env } from '../lib/env.js';
import { isOcrConfigured, processDocument } from '../lib/ocrClient.js';
import { analyzeDocument, failedAnalysis, type DocumentAnalysis, type ExtractedField } from '../lib/documentAnalysis.js';
import { computeEligibility, type ProfileRow, type SchemeRow } from '../lib/eligibility.js';
import { matchDocumentCategory } from '../lib/documentMatching.js';

export const documentsRouter = Router();

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 15 * 1024 * 1024 } });

interface DocumentDbRow {
  id: string;
  name: string;
  category: string;
  file_name: string;
  file_size: string;
  storage_path: string | null;
  uploaded_at: string;
  source: string;
  ocr_status: string;
  quality_status: string;
  verification_status: string;
  authenticity_signals: Record<string, unknown>;
  extracted_fields: ExtractedField[];
}

function toCamelDocument(row: DocumentDbRow) {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    fileName: row.file_name,
    fileSize: row.file_size,
    uploadedAt: row.uploaded_at,
    source: row.source,
    ocrStatus: row.ocr_status,
    qualityStatus: row.quality_status,
    verificationStatus: row.verification_status,
    authenticitySignals: row.authenticity_signals,
    extractedFields: row.extracted_fields,
  };
}

documentsRouter.get('/', requireAuth, async (req, res) => {
  const { data, error } = await supabaseAdmin
    .from('documents')
    .select('*')
    .eq('user_id', req.user!.id)
    .order('created_at', { ascending: false });

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.json((data as DocumentDbRow[]).map(toCamelDocument));
});

interface SchemeDbRowForMissingDocs extends SchemeRow {
  name: string;
  short_name: string;
  benefit_amount: string;
  documents: Array<{ id: string; name: string }>;
}

interface MissingDocumentSchemeRef {
  id: string;
  name: string;
  shortName: string;
  benefitAmount: string;
  matchStatus: string;
}

documentsRouter.get('/missing', requireAuth, async (req, res) => {
  const [{ data: profileData }, { data: userDocs, error: docsError }, { data: schemeRows, error: schemesError }] =
    await Promise.all([
      supabaseAdmin
        .from('profiles')
        .select('full_name, age, gender, state, annual_income, caste_category, occupation, is_student, land_holding_acres')
        .eq('id', req.user!.id)
        .maybeSingle(),
      supabaseAdmin.from('documents').select('category').eq('user_id', req.user!.id),
      supabaseAdmin
        .from('schemes')
        .select(
          'id, name, short_name, benefit_amount, max_income_limit, min_age, max_age, eligible_genders, eligible_states, eligibility_criteria, documents',
        ),
    ]);

  if (docsError) {
    res.status(500).json({ error: docsError.message });
    return;
  }
  if (schemesError) {
    res.status(500).json({ error: schemesError.message });
    return;
  }

  const profile = (profileData as ProfileRow | null) ?? null;
  if (!profile) {
    res.status(400).json({ error: 'Complete your citizen profile to run the missing document detector.' });
    return;
  }

  const documentCategories = new Set((userDocs ?? []).map((d: { category: string }) => d.category));

  // Aggregate, across every scheme the user is at least borderline-eligible for, the
  // required documents they haven't uploaded yet -- ranked by how many schemes each unlocks.
  const missingByName = new Map<string, { category: string | undefined; schemes: MissingDocumentSchemeRef[] }>();

  for (const row of schemeRows as SchemeDbRowForMissingDocs[]) {
    const eligibility = computeEligibility(row, profile);
    if (eligibility.matchStatus === 'Not currently eligible') continue;

    for (const doc of row.documents) {
      const category = matchDocumentCategory(doc.name);
      const isAvailable = category ? documentCategories.has(category) : false;
      if (isAvailable) continue;

      const entry = missingByName.get(doc.name) ?? { category, schemes: [] };
      entry.schemes.push({
        id: row.id,
        name: row.name,
        shortName: row.short_name,
        benefitAmount: row.benefit_amount,
        matchStatus: eligibility.matchStatus,
      });
      missingByName.set(doc.name, entry);
    }
  }

  const missingDocuments = [...missingByName.entries()]
    .map(([name, { category, schemes }]) => ({
      name,
      category: category ?? null,
      schemeCount: schemes.length,
      schemes,
    }))
    .sort((a, b) => b.schemeCount - a.schemeCount || a.name.localeCompare(b.name));

  res.json({ missingDocuments });
});

documentsRouter.post('/', requireAuth, upload.single('file'), async (req, res) => {
  const file = req.file;
  const category = req.body?.category;
  if (!file || !category) {
    res.status(400).json({ error: 'file and category are required' });
    return;
  }

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('full_name, date_of_birth, gender, state, district, occupation, annual_income')
    .eq('id', req.user!.id)
    .maybeSingle();

  const storagePath = `${req.user!.id}/${Date.now()}-${file.originalname}`;
  const { error: uploadError } = await supabaseAdmin.storage
    .from(env.documentsBucket)
    .upload(storagePath, file.buffer, { contentType: file.mimetype, upsert: false });

  if (uploadError) {
    res.status(500).json({ error: `Storage upload failed: ${uploadError.message}` });
    return;
  }

  const displayName = file.originalname.replace(/\.[^/.]+$/, '');
  const sizeLabel =
    file.size < 1024 * 1024
      ? `${Math.max(1, Math.round(file.size / 1024))} KB`
      : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

  // Quality check -> OCR -> LLM field extraction (Python service). A failure here must
  // not lose the upload: the file is stored and flagged so the user can retry/review.
  let analysis: DocumentAnalysis;
  if (!isOcrConfigured()) {
    analysis = failedAnalysis('OCR service is not configured on the server; document was stored without analysis');
  } else {
    try {
      const ocr = await processDocument(file, category);
      analysis = analyzeDocument(ocr, profile);
    } catch (e) {
      console.error('Document OCR failed:', e);
      analysis = failedAnalysis(e instanceof Error ? e.message : 'Document analysis failed');
    }
  }

  const { data, error } = await supabaseAdmin
    .from('documents')
    .insert({
      user_id: req.user!.id,
      name: displayName,
      category,
      file_name: file.originalname,
      file_size: sizeLabel,
      storage_path: storagePath,
      uploaded_at: 'Just now',
      source: 'Upload',
      ocr_status: analysis.ocrStatus,
      quality_status: analysis.qualityStatus,
      verification_status: analysis.verificationStatus,
      authenticity_signals: analysis.authenticitySignals,
      extracted_fields: analysis.extractedFields satisfies ExtractedField[],
    })
    .select('*')
    .single();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.status(201).json(toCamelDocument(data as DocumentDbRow));
});

documentsRouter.patch('/:id/fields/:fieldIndex', requireAuth, async (req, res) => {
  const fieldIndex = Number(req.params.fieldIndex);
  const { value } = req.body ?? {};

  const { data: existing, error: fetchError } = await supabaseAdmin
    .from('documents')
    .select('*')
    .eq('id', req.params.id)
    .eq('user_id', req.user!.id)
    .maybeSingle();

  if (fetchError) {
    res.status(500).json({ error: fetchError.message });
    return;
  }
  if (!existing) {
    res.status(404).json({ error: 'Document not found' });
    return;
  }

  const row = existing as DocumentDbRow;
  if (!row.extracted_fields[fieldIndex]) {
    res.status(400).json({ error: 'Invalid field index' });
    return;
  }

  const nextFields = [...row.extracted_fields];
  nextFields[fieldIndex] = { ...nextFields[fieldIndex], userValue: value, match: true };

  const { data, error } = await supabaseAdmin
    .from('documents')
    .update({ extracted_fields: nextFields })
    .eq('id', row.id)
    .select('*')
    .single();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.json(toCamelDocument(data as DocumentDbRow));
});

documentsRouter.post('/digilocker-connect', requireAuth, async (req, res) => {
  const completenessPercentage = 92;
  const { error } = await supabaseAdmin
    .from('profiles')
    .update({ digilocker_connected: true, completeness_percentage: completenessPercentage })
    .eq('id', req.user!.id);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.json({ digiLockerConnected: true, completenessPercentage });
});
