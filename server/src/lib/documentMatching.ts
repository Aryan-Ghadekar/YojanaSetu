export const DOCUMENT_CATEGORY_HINTS: Record<string, string[]> = {
  Identity: ['aadhaar', 'pan'],
  Income: ['income'],
  Education: ['marksheet', 'admission', 'bona fide', 'fee receipt', 'academic'],
  'Caste / Category': ['caste'],
  Residence: ['domicile', 'residence', 'ration'],
  Banking: ['bank'],
  'Land / Property': ['land', '7/12', 'property'],
};

/** Maps a required-document label (e.g. "Maharashtra Domicile Certificate") to the closest uploaded-document category. */
export function matchDocumentCategory(documentName: string): string | undefined {
  const nameLower = documentName.toLowerCase();
  return Object.entries(DOCUMENT_CATEGORY_HINTS).find(([, hints]) => hints.some((hint) => nameLower.includes(hint)))?.[0];
}
