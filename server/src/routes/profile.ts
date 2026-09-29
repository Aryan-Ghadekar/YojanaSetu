import { Router } from 'express';
import { supabaseAdmin } from '../lib/supabaseAdmin.js';
import { requireAuth } from '../middleware/auth.js';

export const profileRouter = Router();

interface ProfileDbRow {
  full_name: string;
  age: number;
  date_of_birth: string;
  gender: string;
  state: string;
  district: string;
  taluka: string;
  residence_type: string;
  occupation: string;
  annual_income: number;
  caste_category: string;
  education_level: string;
  family_members: number;
  is_student: boolean;
  is_differently_abled: boolean;
  land_holding_acres: number;
  aadhaar_linked: boolean;
  digilocker_connected: boolean;
  completeness_percentage: number;
}

function toCamelProfile(row: ProfileDbRow) {
  return {
    fullName: row.full_name,
    age: row.age,
    dateOfBirth: row.date_of_birth,
    gender: row.gender,
    state: row.state,
    district: row.district,
    taluka: row.taluka,
    residenceType: row.residence_type,
    occupation: row.occupation,
    annualIncome: row.annual_income,
    casteCategory: row.caste_category,
    educationLevel: row.education_level,
    familyMembers: row.family_members,
    isStudent: row.is_student,
    isDifferentlyAbled: row.is_differently_abled,
    landHoldingAcres: row.land_holding_acres,
    aadhaarLinked: row.aadhaar_linked,
    digiLockerConnected: row.digilocker_connected,
    completenessPercentage: row.completeness_percentage,
  };
}

function toSnakeProfileUpdate(body: Partial<ReturnType<typeof toCamelProfile>>) {
  const map: Record<string, unknown> = {};
  if (body.fullName !== undefined) map.full_name = body.fullName;
  if (body.age !== undefined) map.age = Number(body.age);
  if (body.dateOfBirth !== undefined) map.date_of_birth = body.dateOfBirth;
  if (body.gender !== undefined) map.gender = body.gender;
  if (body.state !== undefined) map.state = body.state;
  if (body.district !== undefined) map.district = body.district;
  if (body.taluka !== undefined) map.taluka = body.taluka;
  if (body.residenceType !== undefined) map.residence_type = body.residenceType;
  if (body.occupation !== undefined) map.occupation = body.occupation;
  if (body.annualIncome !== undefined) map.annual_income = Number(body.annualIncome);
  if (body.casteCategory !== undefined) map.caste_category = body.casteCategory;
  if (body.educationLevel !== undefined) map.education_level = body.educationLevel;
  if (body.familyMembers !== undefined) map.family_members = Number(body.familyMembers);
  if (body.isStudent !== undefined) map.is_student = body.isStudent;
  if (body.isDifferentlyAbled !== undefined) map.is_differently_abled = body.isDifferentlyAbled;
  if (body.landHoldingAcres !== undefined) map.land_holding_acres = Number(body.landHoldingAcres);
  if (body.aadhaarLinked !== undefined) map.aadhaar_linked = body.aadhaarLinked;
  if (body.digiLockerConnected !== undefined) map.digilocker_connected = body.digiLockerConnected;
  if (body.completenessPercentage !== undefined) map.completeness_percentage = Number(body.completenessPercentage);
  return map;
}

profileRouter.get('/', requireAuth, async (req, res) => {
  const { data, error } = await supabaseAdmin.from('profiles').select('*').eq('id', req.user!.id).maybeSingle();
  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  if (!data) {
    res.status(404).json({ error: 'Profile not found' });
    return;
  }
  res.json(toCamelProfile(data as ProfileDbRow));
});

profileRouter.put('/', requireAuth, async (req, res) => {
  const updates = toSnakeProfileUpdate(req.body ?? {});
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', req.user!.id)
    .select('*')
    .single();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  res.json(toCamelProfile(data as ProfileDbRow));
});
