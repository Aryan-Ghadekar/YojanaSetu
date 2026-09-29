-- Auto-generated seed data for the `schemes` reference catalog.
-- Static, publicly known scheme rules -- not tied to any individual citizen.

insert into public.schemes (
  id, name, short_name, department, ministry, level, category,
  benefit_amount, benefit_type, benefit_frequency, target_audience, deadline,
  official_portal, last_verified_date, processing_time, complexity, summary,
  max_income_limit, min_age, max_age, eligible_genders, eligible_states,
  eligibility_criteria, documents, application_steps
) values (
  'maha-swadhar-2026', 'Dr. Babasaheb Ambedkar Swadhar Yojana', 'Swadhar Education Scheme', 'Social Justice and Special Assistance Department', 'Government of Maharashtra', 'State (Maharashtra)', 'Education & Scholarships',
  '₹51,000 - ₹60,000', 'Scholarship & Fee Waiver', 'Annual', 'SC/Navbudhha & reserved category collegiate students without government hostel allocation', '15 Nov 2026',
  'mahadbt.maharashtra.gov.in', '24 Sep 2026', '21 - 30 days', 'Low', 'Direct financial assistance for food, accommodation, and educational material for backward category collegiate students not allotted government hostels.',
  250000, 17, 28, ARRAY['All', 'Female', 'Male', 'Transgender'], ARRAY['Maharashtra'],
  '[{"id":"c1","label":"Domicile of Maharashtra","requirement":"Must hold valid Maharashtra State Domicile Certificate","ruleCode":"MAHA-DOM-SEC3"},{"id":"c2","label":"Family Annual Income Limit","requirement":"Gross annual parental income must be ≤ ₹2,50,000","ruleCode":"INC-L25-REV"},{"id":"c3","label":"Current Academic Enrollment","requirement":"Enrolled in recognized higher diploma or degree program","ruleCode":"EDU-HE-ENR"},{"id":"c4","label":"Hostel Non-Allotment Certificate","requirement":"Declaration that student did not receive government hostel room","ruleCode":"SWD-HST-DECL"},{"id":"c5","label":"Bank Account Aadhaar Seeding","requirement":"Aadhaar-seeded NPCI mapper active bank account","ruleCode":"DBT-NPCI-01"}]'::jsonb, '[{"id":"d1","name":"Aadhaar Card"},{"id":"d2","name":"Maharashtra Domicile Certificate"},{"id":"d3","name":"Income Certificate (Tehsildar)"},{"id":"d4","name":"Caste Certificate / Validity"},{"id":"d5","name":"College Admission Bona Fide"},{"id":"d6","name":"Hostel Non-Allotment Undertaking"}]'::jsonb, ARRAY['Document Pre-check & Digilocker Import', 'Eligibility Verification & Institute Tagging', 'Address & Distance Declaration Form', 'Hostel Non-Availability Undertaking Upload', 'Aadhaar e-Sign & Final Submission', 'Application Tracking on MahaDBT Gateway']
)
on conflict (id) do update set
  name = excluded.name, short_name = excluded.short_name, department = excluded.department,
  ministry = excluded.ministry, level = excluded.level, category = excluded.category,
  benefit_amount = excluded.benefit_amount, benefit_type = excluded.benefit_type,
  benefit_frequency = excluded.benefit_frequency, target_audience = excluded.target_audience,
  deadline = excluded.deadline, official_portal = excluded.official_portal,
  last_verified_date = excluded.last_verified_date, processing_time = excluded.processing_time,
  complexity = excluded.complexity, summary = excluded.summary, max_income_limit = excluded.max_income_limit,
  min_age = excluded.min_age, max_age = excluded.max_age, eligible_genders = excluded.eligible_genders,
  eligible_states = excluded.eligible_states, eligibility_criteria = excluded.eligibility_criteria,
  documents = excluded.documents, application_steps = excluded.application_steps;

insert into public.schemes (
  id, name, short_name, department, ministry, level, category,
  benefit_amount, benefit_type, benefit_frequency, target_audience, deadline,
  official_portal, last_verified_date, processing_time, complexity, summary,
  max_income_limit, min_age, max_age, eligible_genders, eligible_states,
  eligibility_criteria, documents, application_steps
) values (
  'post-matric-scholarship-2026', 'Centrally Sponsored Post-Matric Scholarship', 'Post-Matric National Scholarship', 'Department of Higher Education', 'Ministry of Education & Social Justice', 'Central', 'Education & Scholarships',
  'Up to ₹50,000/year', 'Scholarship & Fee Waiver', 'Annual', 'Eligible students studying post-secondary courses with household income under ₹2.5 Lakhs.', '30 Oct 2026',
  'scholarships.gov.in', '21 Sep 2026', '30 - 45 days', 'Medium', 'Comprehensive financial assistance covering tuition reimbursement and monthly maintenance allowances for students pursuing graduation and diploma studies.',
  250000, 16, 30, ARRAY['All', 'Female', 'Male', 'Transgender'], ARRAY['All India'],
  '[{"id":"pms1","label":"Academic Qualification","requirement":"Minimum 50% aggregate in 12th / Previous Semester"},{"id":"pms2","label":"Income Cap (Family)","requirement":"Under ₹2,50,000 per annum from all verifiable sources"},{"id":"pms3","label":"Category Affirmation","requirement":"Recognized SC/ST/OBC category certificate"}]'::jsonb, '[{"id":"p1","name":"Aadhaar Card"},{"id":"p2","name":"Income Certificate"},{"id":"p3","name":"Caste Certificate"},{"id":"p4","name":"Previous Year Marksheet"},{"id":"p5","name":"Bank Passbook / Cancelled Cheque"},{"id":"p6","name":"Current Fee Receipt"}]'::jsonb, ARRAY['National Scholarship Portal (NSP) OTR registration', 'Scheme selection & Institute verification', 'Upload academic records & Fee receipt', 'Aadhaar OTP authentication', 'College Nodal Officer Approval', 'State DBT Disbursal']
)
on conflict (id) do update set
  name = excluded.name, short_name = excluded.short_name, department = excluded.department,
  ministry = excluded.ministry, level = excluded.level, category = excluded.category,
  benefit_amount = excluded.benefit_amount, benefit_type = excluded.benefit_type,
  benefit_frequency = excluded.benefit_frequency, target_audience = excluded.target_audience,
  deadline = excluded.deadline, official_portal = excluded.official_portal,
  last_verified_date = excluded.last_verified_date, processing_time = excluded.processing_time,
  complexity = excluded.complexity, summary = excluded.summary, max_income_limit = excluded.max_income_limit,
  min_age = excluded.min_age, max_age = excluded.max_age, eligible_genders = excluded.eligible_genders,
  eligible_states = excluded.eligible_states, eligibility_criteria = excluded.eligibility_criteria,
  documents = excluded.documents, application_steps = excluded.application_steps;

insert into public.schemes (
  id, name, short_name, department, ministry, level, category,
  benefit_amount, benefit_type, benefit_frequency, target_audience, deadline,
  official_portal, last_verified_date, processing_time, complexity, summary,
  max_income_limit, min_age, max_age, eligible_genders, eligible_states,
  eligibility_criteria, documents, application_steps
) values (
  'pm-kisan-samman-2026', 'PM Kisan Samman Nidhi (Farmer Support)', 'PM-KISAN', 'Department of Agriculture & Farmers Welfare', 'Ministry of Agriculture', 'Central', 'Agriculture & Farmers',
  '₹6,000 / year', 'Direct Benefit Transfer', 'Quarterly', 'Small and marginal landholder farmer families with cultivable land.', 'Rolling (Continuous)',
  'pmkisan.gov.in', '26 Sep 2026', '15 - 20 days', 'Low', 'Direct income support of ₹6,000 per year transferred in three equal installments of ₹2,000 each directly into the bank accounts of landholding farmer families.',
  500000, 18, 75, ARRAY['All', 'Female', 'Male'], ARRAY['All India'],
  '[{"id":"k1","label":"Cultivable Land Record","requirement":"Must own cultivable agricultural land in family name"},{"id":"k2","label":"Aadhaar eKYC Completion","requirement":"Mandatory Aadhaar biometric or OTP eKYC verification"},{"id":"k3","label":"Income Tax Exclusion Check","requirement":"Applicant must not be an assessed income-tax payer"}]'::jsonb, '[{"id":"k1","name":"Aadhaar Card"},{"id":"k2","name":"Land Record (7/12 Extract)"},{"id":"k3","name":"Aadhaar-linked Bank Account"}]'::jsonb, ARRAY['Self-registration via PM Kisan Portal / CSC', 'Enter Aadhaar & State Land Ledger Code', 'OTP validation & Family Member Declaration', 'District Revenue Officer land-title verification', 'Installment activation on PFMS']
)
on conflict (id) do update set
  name = excluded.name, short_name = excluded.short_name, department = excluded.department,
  ministry = excluded.ministry, level = excluded.level, category = excluded.category,
  benefit_amount = excluded.benefit_amount, benefit_type = excluded.benefit_type,
  benefit_frequency = excluded.benefit_frequency, target_audience = excluded.target_audience,
  deadline = excluded.deadline, official_portal = excluded.official_portal,
  last_verified_date = excluded.last_verified_date, processing_time = excluded.processing_time,
  complexity = excluded.complexity, summary = excluded.summary, max_income_limit = excluded.max_income_limit,
  min_age = excluded.min_age, max_age = excluded.max_age, eligible_genders = excluded.eligible_genders,
  eligible_states = excluded.eligible_states, eligibility_criteria = excluded.eligibility_criteria,
  documents = excluded.documents, application_steps = excluded.application_steps;

insert into public.schemes (
  id, name, short_name, department, ministry, level, category,
  benefit_amount, benefit_type, benefit_frequency, target_audience, deadline,
  official_portal, last_verified_date, processing_time, complexity, summary,
  max_income_limit, min_age, max_age, eligible_genders, eligible_states,
  eligibility_criteria, documents, application_steps
) values (
  'maha-youth-stipend-borderline', 'Chhatrapati Shahu Maharaj Shikshan Shulk Fellowship', 'Higher Education Fee Reimbursement', 'Higher and Technical Education Department', 'Government of Maharashtra', 'State (Maharashtra)', 'Education & Scholarships',
  '50% - 100% Tuition Fee Waiver', 'Scholarship & Fee Waiver', 'Per Semester', 'Economically weaker and backwards classes admitted through CAP round in professional courses.', '20 Nov 2026',
  'mahadbt.maharashtra.gov.in', '19 Sep 2026', '30 days', 'Medium', 'Provides 50% tuition and exam fee reimbursement for students admitted through centralized admissions with family income up to ₹8,00,000, with 100% bracket at ₹2,00,000.',
  200000, 17, 32, ARRAY['All', 'Female', 'Male'], ARRAY['Maharashtra'],
  '[{"id":"b1","label":"Income Threshold Classification","requirement":"Automatic Tier-1 full waiver: ≤ ₹2,00,000. Tier-2 50% waiver: ₹2,00,001 - ₹8,00,000.","ruleCode":"MHA-FEES-SLAB2"},{"id":"b2","label":"CAP Round Admission Confirmation","requirement":"Must have secured seat through State Centralized Allotment Process"},{"id":"b3","label":"Attendance & Backlog Rule","requirement":"Minimum 75% attendance and no more than 2 allowed backlogs"}]'::jsonb, '[{"id":"bdoc1","name":"CAP Allotment Letter"},{"id":"bdoc2","name":"Tehsildar Income Certificate"},{"id":"bdoc3","name":"Ration Card / Family Declaration"}]'::jsonb, ARRAY['Select CAP allotment ID on MahaDBT', 'Clarify Income Tier (Tier 2 50% fee or request Agricultural deduction)', 'Upload Tehsildar Income Certificate and Ration Card', 'Submit to College Verification Officer', 'Fee adjusted directly in college treasury']
)
on conflict (id) do update set
  name = excluded.name, short_name = excluded.short_name, department = excluded.department,
  ministry = excluded.ministry, level = excluded.level, category = excluded.category,
  benefit_amount = excluded.benefit_amount, benefit_type = excluded.benefit_type,
  benefit_frequency = excluded.benefit_frequency, target_audience = excluded.target_audience,
  deadline = excluded.deadline, official_portal = excluded.official_portal,
  last_verified_date = excluded.last_verified_date, processing_time = excluded.processing_time,
  complexity = excluded.complexity, summary = excluded.summary, max_income_limit = excluded.max_income_limit,
  min_age = excluded.min_age, max_age = excluded.max_age, eligible_genders = excluded.eligible_genders,
  eligible_states = excluded.eligible_states, eligibility_criteria = excluded.eligibility_criteria,
  documents = excluded.documents, application_steps = excluded.application_steps;

insert into public.schemes (
  id, name, short_name, department, ministry, level, category,
  benefit_amount, benefit_type, benefit_frequency, target_audience, deadline,
  official_portal, last_verified_date, processing_time, complexity, summary,
  max_income_limit, min_age, max_age, eligible_genders, eligible_states,
  eligibility_criteria, documents, application_steps
) values (
  'pm-surya-ghar-2026', 'PM Surya Ghar: Muft Bijli Yojana (Rooftop Solar)', 'PM Surya Ghar Solar Subsidy', 'Ministry of New and Renewable Energy', 'Central Government of India', 'Central', 'Housing & Shelter',
  '₹30,000 - ₹78,000 Direct Subsidy', 'Subsidy & Grant', 'One-time', 'Residential households seeking rooftop solar installation up to 3 kW capacity.', 'Rolling Scheme',
  'pmsuryaghar.gov.in', '15 Sep 2026', '25 - 35 days', 'Medium', 'Provides direct financial subsidy for installing rooftop solar panels, providing up to 300 units of free electricity every month for residential households.',
  1200000, 18, 80, ARRAY['All'], ARRAY['All India'],
  '[{"id":"sg1","label":"Residential Electricity Meter","requirement":"Active domestic low-tension electricity consumer connection"},{"id":"sg2","label":"Roof Ownership Rights","requirement":"Unobstructed roof space or terrace with legal ownership"}]'::jsonb, '[{"id":"sgdoc1","name":"Latest Electricity Bill (Past 3 Months)"},{"id":"sgdoc2","name":"Roof Ownership / Property Tax Receipt"},{"id":"sgdoc3","name":"Aadhaar Card"}]'::jsonb, ARRAY['Register on National Portal with DISCOM consumer number', 'Receive technical feasibility approval from MSEDCL', 'Select registered empanelled vendor for installation', 'Net-metering inspection and commissioning certificate', 'Subsidy credited directly into bank account in 30 days']
)
on conflict (id) do update set
  name = excluded.name, short_name = excluded.short_name, department = excluded.department,
  ministry = excluded.ministry, level = excluded.level, category = excluded.category,
  benefit_amount = excluded.benefit_amount, benefit_type = excluded.benefit_type,
  benefit_frequency = excluded.benefit_frequency, target_audience = excluded.target_audience,
  deadline = excluded.deadline, official_portal = excluded.official_portal,
  last_verified_date = excluded.last_verified_date, processing_time = excluded.processing_time,
  complexity = excluded.complexity, summary = excluded.summary, max_income_limit = excluded.max_income_limit,
  min_age = excluded.min_age, max_age = excluded.max_age, eligible_genders = excluded.eligible_genders,
  eligible_states = excluded.eligible_states, eligibility_criteria = excluded.eligibility_criteria,
  documents = excluded.documents, application_steps = excluded.application_steps;

insert into public.schemes (
  id, name, short_name, department, ministry, level, category,
  benefit_amount, benefit_type, benefit_frequency, target_audience, deadline,
  official_portal, last_verified_date, processing_time, complexity, summary,
  max_income_limit, min_age, max_age, eligible_genders, eligible_states,
  eligibility_criteria, documents, application_steps
) values (
  'pm-mudra-yojana-2026', 'Pradhan Mantri MUDRA Yojana (Kishor / Tarun Loan)', 'PMMY Business Loan Support', 'Department of Financial Services', 'Ministry of Finance', 'Central', 'Micro & Small Business',
  'Up to ₹10,00,000 Collateral-Free Credit', 'Credit / Loan Support', 'One-time', 'Non-corporate, non-farm small/micro enterprises and startups.', 'Continuous',
  'mudra.org.in', '10 Sep 2026', '14 - 21 days', 'High', 'Collateral-free institutional credit up to ₹10 Lakhs (extended up to ₹20 Lakhs under Tarun Plus) for non-corporate micro enterprises at subsidized interest rates.',
  2500000, 18, 65, ARRAY['All'], ARRAY['All India'],
  '[{"id":"md1","label":"Viable Business Proposal","requirement":"Project report or plan for proposed micro-enterprise"},{"id":"md2","label":"No Defaulter Status","requirement":"Applicant should not have defaulted with any scheduled commercial bank"}]'::jsonb, '[{"id":"m1","name":"Aadhaar & PAN Card"},{"id":"m2","name":"Udyam Registration Certificate"},{"id":"m3","name":"Bank Statement (Last 6 Months)"}]'::jsonb, ARRAY['Prepare project estimation or asset quote', 'Submit Udyam registration online', 'Apply via JanSamarth portal or partner bank branch', 'Field verification by Branch Officer', 'Loan sanction & Mudra Debit Card dispatch']
)
on conflict (id) do update set
  name = excluded.name, short_name = excluded.short_name, department = excluded.department,
  ministry = excluded.ministry, level = excluded.level, category = excluded.category,
  benefit_amount = excluded.benefit_amount, benefit_type = excluded.benefit_type,
  benefit_frequency = excluded.benefit_frequency, target_audience = excluded.target_audience,
  deadline = excluded.deadline, official_portal = excluded.official_portal,
  last_verified_date = excluded.last_verified_date, processing_time = excluded.processing_time,
  complexity = excluded.complexity, summary = excluded.summary, max_income_limit = excluded.max_income_limit,
  min_age = excluded.min_age, max_age = excluded.max_age, eligible_genders = excluded.eligible_genders,
  eligible_states = excluded.eligible_states, eligibility_criteria = excluded.eligibility_criteria,
  documents = excluded.documents, application_steps = excluded.application_steps;


-- Auto-generated seed data for `admin_district_metrics` (district welfare reporting).

insert into public.admin_district_metrics (
  district, state, eligible_population, application_volume, approval_rate,
  utilization_rate, unused_funds_crores, awareness_gap_score, top_missing_document
) values (
  'Pune', 'Maharashtra', 1420000, 894000, 88.4,
  78.2, 64.5, 'Low', 'Hostel Non-Allotment Certificate'
);
insert into public.admin_district_metrics (
  district, state, eligible_population, application_volume, approval_rate,
  utilization_rate, unused_funds_crores, awareness_gap_score, top_missing_document
) values (
  'Gadchiroli', 'Maharashtra', 640000, 182000, 72.1,
  34.8, 118.2, 'Severe', 'Income Certificate (Tehsildar)'
);
insert into public.admin_district_metrics (
  district, state, eligible_population, application_volume, approval_rate,
  utilization_rate, unused_funds_crores, awareness_gap_score, top_missing_document
) values (
  'Nandurbar', 'Maharashtra', 780000, 245000, 74.3,
  41.5, 92.4, 'Severe', 'Caste Validity Certificate'
);
insert into public.admin_district_metrics (
  district, state, eligible_population, application_volume, approval_rate,
  utilization_rate, unused_funds_crores, awareness_gap_score, top_missing_document
) values (
  'Solapur', 'Maharashtra', 1120000, 670000, 82.5,
  64.9, 53, 'Moderate', 'Aadhaar NPCI Bank Seeding'
);
insert into public.admin_district_metrics (
  district, state, eligible_population, application_volume, approval_rate,
  utilization_rate, unused_funds_crores, awareness_gap_score, top_missing_document
) values (
  'Nagpur', 'Maharashtra', 1250000, 820000, 86.8,
  74.6, 48.7, 'Low', 'Rooftop Electricity Meter Bill'
);
insert into public.admin_district_metrics (
  district, state, eligible_population, application_volume, approval_rate,
  utilization_rate, unused_funds_crores, awareness_gap_score, top_missing_document
) values (
  'Nashik', 'Maharashtra', 1310000, 790000, 84.1,
  71.3, 59.2, 'Low', '7/12 Land Record Mutation'
);
insert into public.admin_district_metrics (
  district, state, eligible_population, application_volume, approval_rate,
  utilization_rate, unused_funds_crores, awareness_gap_score, top_missing_document
) values (
  'Dharashiv (Osmanabad)', 'Maharashtra', 580000, 220000, 76.4,
  45.2, 61.8, 'Severe', 'Income Certificate (Tehsildar)'
);

-- Seed data for the Scheme Utilization Analytics admin dashboard.

insert into public.admin_monthly_trends (month, sort_order, applications, approved) values
  ('Apr 26', 1, 420000, 350000),
  ('May 26', 2, 510000, 430000),
  ('Jun 26', 3, 680000, 580000),
  ('Jul 26', 4, 920000, 780000),
  ('Aug 26', 5, 1150000, 970000),
  ('Sep 26', 6, 1340000, 1140000);

insert into public.admin_rejection_reasons (reason, percentage, color, sort_order) values
  ('Missing / Blurry Income Certificate', 42, '#EF4444', 1),
  ('Aadhaar-NPCI Bank Seeding Failed', 26, '#F59E0B', 2),
  ('Hostel Undertaking Not Signed', 18, '#8B5CF6', 3),
  ('Income Threshold Exceeded (>2.5L)', 9, '#3B82F6', 4),
  ('Duplicate Application / CAP Mismatch', 5, '#64748B', 5);

insert into public.admin_funnel_stages (stage, percentage, volume_label, sort_order) values
  ('1. Scheme Viewed', 100, '2.4M', 1),
  ('2. Eligibility Checked', 78, '1.87M', 2),
  ('3. Documents Ingested', 58, '1.39M', 3),
  ('4. Form Completed', 44, '1.05M', 4),
  ('5. Successfully Submitted', 39, '936k', 5);
