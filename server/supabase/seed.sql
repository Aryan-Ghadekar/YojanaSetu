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

-- ---------------------------------------------------------------------------
-- Additional real government schemes: Healthcare & Wellness, Housing & Shelter,
-- Women & Child Development, Skill & Employment, Social Welfare & Pension,
-- plus further depth in Agriculture & Farmers and Micro & Small Business.
-- ---------------------------------------------------------------------------

insert into public.schemes (
  id, name, short_name, department, ministry, level, category,
  benefit_amount, benefit_type, benefit_frequency, target_audience, deadline,
  official_portal, last_verified_date, processing_time, complexity, summary,
  max_income_limit, min_age, max_age, eligible_genders, eligible_states,
  eligibility_criteria, documents, application_steps
) values (
  'ayushman-bharat-pmjay-2026', 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana', 'Ayushman Bharat PM-JAY', 'National Health Authority', 'Ministry of Health and Family Welfare', 'Central', 'Healthcare & Wellness',
  '₹5,00,000 / family / year', 'Health Insurance', 'Annual', 'Economically vulnerable families identified under SECC deprivation criteria, with cover extended to all senior citizens aged 70+ under Ayushman Vay Vandana.', 'Rolling (Continuous)',
  'pmjay.gov.in', '26 Sep 2026', 'Instant e-card issue; cashless at admission', 'Low', 'Provides cashless and paperless health cover of ₹5 lakh per family per year for secondary and tertiary hospitalization at empanelled public and private hospitals across India.',
  300000, 0, 100, ARRAY['All'], ARRAY['All India'],
  '[{"id":"ay1","label":"SECC Deprivation Category Listing","requirement":"Family listed under SECC 2011 deprivation criteria or holds a valid eligible ration card","ruleCode":"PMJAY-SECC-01"},{"id":"ay2","label":"No Overlapping Government Health Cover","requirement":"Not already covered under ESIC, CGHS, or another government-funded health insurance scheme"},{"id":"ay3","label":"Aadhaar-linked Family Identification","requirement":"Family members verifiable via Aadhaar for e-card generation"}]'::jsonb, '[{"id":"ay1","name":"Aadhaar Card"},{"id":"ay2","name":"Ration Card / SECC Family ID"},{"id":"ay3","name":"Recent Passport Photo"}]'::jsonb, ARRAY['Check eligibility on the PM-JAY portal or Ayushman App using Aadhaar or ration number', 'Visit the nearest empanelled hospital or Common Service Centre', 'Aadhaar e-KYC and family verification by the Pradhan Mantri Arogya Mitra', 'Golden e-card generated on approval', 'Cashless treatment availed directly at the hospital']
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
  'pmay-gramin-2026', 'Pradhan Mantri Awas Yojana - Gramin', 'PMAY-Gramin', 'Department of Rural Development', 'Ministry of Rural Development', 'Central', 'Housing & Shelter',
  '₹1,20,000 - ₹1,30,000', 'Subsidy & Grant', 'One-time', 'Houseless rural families and those living in kutcha or dilapidated houses, identified through the Awaas+ survey.', 'Rolling (Continuous)',
  'pmayg.nic.in', '22 Sep 2026', '60 - 90 days', 'Medium', 'Central assistance for construction of a pucca house with basic amenities for rural households that are houseless or living in inadequate housing, disbursed in installments linked to construction progress.',
  200000, 18, 90, ARRAY['All'], ARRAY['All India'],
  '[{"id":"pg1","label":"Awaas+ Survey Listing","requirement":"Household listed in the Awaas+ / SECC housing deprivation survey"},{"id":"pg2","label":"Family Income Limit","requirement":"Family annual income does not exceed ₹2,00,000"},{"id":"pg3","label":"No Existing Pucca House","requirement":"Family must not already own a pucca house anywhere in India"}]'::jsonb, '[{"id":"pg1","name":"Aadhaar Card"},{"id":"pg2","name":"Awaas+ Survey ID / MGNREGA Job Card"},{"id":"pg3","name":"Bank Passbook"},{"id":"pg4","name":"Homestead / Land Ownership Proof"}]'::jsonb, ARRAY['Verify inclusion in the Awaas+ permanent waitlist', 'Gram Sabha verification and geo-tagging of the homestead', 'Aadhaar-linked bank account seeding for direct transfer', 'First installment released on foundation completion', 'Subsequent installments released on lintel-level and roof-level completion']
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
  'pmmvy-2026', 'Pradhan Mantri Matru Vandana Yojana', 'PMMVY', 'Ministry of Women and Child Development', 'Ministry of Women and Child Development', 'Central', 'Women & Child Development',
  '₹5,000 (in 3 installments)', 'Direct Benefit Transfer', 'One-time', 'Pregnant and lactating women, for their first living child.', 'Rolling (Continuous)',
  'pmmvy.wcd.gov.in', '18 Sep 2026', '30 - 45 days per installment', 'Low', 'Cash incentive paid directly to pregnant and lactating women to partially compensate for wage loss and encourage adequate nutrition and care during pregnancy and after childbirth, for the first living child.',
  800000, 19, 45, ARRAY['Female'], ARRAY['All India'],
  '[{"id":"mv1","label":"First Living Child","requirement":"Benefit applies to the woman''s first living child only"},{"id":"mv2","label":"Not a Regular Government/PSU Employee","requirement":"Applicant should not be a regular employee of Central/State Government or a PSU"},{"id":"mv3","label":"MCP Card Registration","requirement":"Registered Mother and Child Protection card with Aadhaar-linked bank account"}]'::jsonb, '[{"id":"mv1","name":"Aadhaar Card"},{"id":"mv2","name":"MCP (Mother and Child Protection) Card"},{"id":"mv3","name":"Bank Passbook"},{"id":"mv4","name":"Pregnancy Registration / LMP Certificate"}]'::jsonb, ARRAY['Register pregnancy at an Anganwadi Centre or approved health facility', 'Submit Aadhaar and bank details on the PMMVY Common Application Software', 'First installment released on early pregnancy registration', 'Second installment released after six months on completion of ANC checkup', 'Final installment released after childbirth registration and the first immunization cycle']
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
  'majhi-ladki-bahin-2026', 'Mukhyamantri Majhi Ladki Bahin Yojana', 'Ladki Bahin Yojana', 'Women and Child Development Department', 'Government of Maharashtra', 'State (Maharashtra)', 'Women & Child Development',
  '₹1,500 / month', 'Direct Benefit Transfer', 'Monthly', 'Married, widowed, divorced, or destitute women aged 21-65 from economically weaker households in Maharashtra.', 'Rolling (Continuous)',
  'ladakibahin.maharashtra.gov.in', '27 Sep 2026', '30 - 45 days', 'Low', 'Monthly direct cash transfer of ₹1,500 to eligible women to support financial independence and household nutrition, credited directly into the beneficiary''s Aadhaar-linked bank account.',
  250000, 21, 65, ARRAY['Female'], ARRAY['Maharashtra'],
  '[{"id":"lb1","label":"Domicile of Maharashtra","requirement":"Must hold a valid Maharashtra domicile or residence certificate","ruleCode":"MAHA-DOM-SEC3"},{"id":"lb2","label":"Family Income Limit","requirement":"Family annual income does not exceed ₹2,50,000"},{"id":"lb3","label":"Single Aadhaar-seeded Bank Account","requirement":"Must not already receive benefits under a similar income-support scheme"}]'::jsonb, '[{"id":"lb1","name":"Aadhaar Card"},{"id":"lb2","name":"Maharashtra Domicile / Residence Certificate"},{"id":"lb3","name":"Income Certificate"},{"id":"lb4","name":"Bank Passbook (Single Account)"}]'::jsonb, ARRAY['Apply online via the Nari Shakti Doot app or offline at an Anganwadi / Setu Centre', 'Complete Aadhaar e-KYC and family income self-declaration', 'Village or Ward level Committee verification', 'Approval and monthly transfer activation on PFMS', 'Continued disbursal subject to annual re-verification']
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
  'kanya-sumangala-up-2026', 'Mukhyamantri Kanya Sumangala Yojana', 'Kanya Sumangala Yojana', 'Department of Women and Child Development', 'Government of Uttar Pradesh', 'State (Uttar Pradesh)', 'Women & Child Development',
  '₹25,000 (across 6 installments)', 'Direct Benefit Transfer', 'Milestone-based', 'Families with up to two daughters, from birth through graduation, across Uttar Pradesh.', 'Rolling (Continuous)',
  'mksy.up.gov.in', '20 Sep 2026', '30 - 60 days per installment', 'Medium', 'Staged financial assistance of ₹25,000 paid across six milestones -- birth, immunization, and school admission at Class 1, 6, 9, and graduation or vocational enrolment -- for up to two girl children per family.',
  300000, 0, 21, ARRAY['Female'], ARRAY['Uttar Pradesh'],
  '[{"id":"ks1","label":"Domicile of Uttar Pradesh","requirement":"Family must be a permanent resident of Uttar Pradesh"},{"id":"ks2","label":"Family Income Limit","requirement":"Family annual income does not exceed ₹3,00,000"},{"id":"ks3","label":"Maximum Two Daughters per Family","requirement":"Applicable for a maximum of two daughters per family, with an exception for twin girls as the second birth"}]'::jsonb, '[{"id":"ks1","name":"Aadhaar Card / Birth Certificate"},{"id":"ks2","name":"Uttar Pradesh Domicile Certificate"},{"id":"ks3","name":"Income Certificate"},{"id":"ks4","name":"School Enrollment Proof (for later installments)"}]'::jsonb, ARRAY['Register on the Kanya Sumangala Yojana portal with mobile OTP verification', 'Upload birth certificate and family income proof', 'Block or District level Committee verification', 'First installment disbursed to the mother or guardian account on birth registration', 'Subsequent installments auto-triggered on submission of class enrollment proof']
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
  'pm-vishwakarma-2026', 'PM Vishwakarma Yojana', 'PM Vishwakarma', 'Ministry of Micro, Small and Medium Enterprises', 'Ministry of Micro, Small and Medium Enterprises', 'Central', 'Skill & Employment',
  '₹15,000 toolkit grant + collateral-free loans up to ₹3,00,000', 'Credit / Loan Support', 'One-time', 'Traditional artisans and craftspeople across 18 recognized trades, including carpenters, goldsmiths, potters, tailors, and cobblers.', 'Rolling (Continuous)',
  'pmvishwakarma.gov.in', '12 Sep 2026', '30 - 40 days', 'Medium', 'Recognizes and supports traditional artisans with a PM Vishwakarma certificate and ID, a ₹15,000 toolkit incentive, skill upgradation training with a daily stipend, and collateral-free credit up to ₹3 lakh at concessional 5% interest across two tranches.',
  300000, 18, 65, ARRAY['All'], ARRAY['All India'],
  '[{"id":"vk1","label":"Recognized Trade Engagement","requirement":"Must be engaged in one of the 18 recognized Vishwakarma trades"},{"id":"vk2","label":"No Recent Similar Credit Scheme","requirement":"Should not have availed a similar credit-linked scheme such as PMEGP or Mudra in the past 5 years for the same activity"},{"id":"vk3","label":"Common Service Centre Registration","requirement":"Registration and trade verification completed through a Common Service Centre"}]'::jsonb, '[{"id":"vk1","name":"Aadhaar Card"},{"id":"vk2","name":"Trade / Occupation Self-Declaration"},{"id":"vk3","name":"Bank Passbook"},{"id":"vk4","name":"Udyam Registration Certificate (optional)"}]'::jsonb, ARRAY['Register at a Common Service Centre with biometric Aadhaar verification', 'Trade verification by the local body or Gram Panchayat', 'Complete basic skill training of 5-7 days with a ₹500/day stipend', 'Receive the ₹15,000 toolkit incentive as an e-voucher', 'First loan tranche of ₹1,00,000 followed by ₹2,00,000 on repayment track record']
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
  'pmkvy-4-2026', 'Pradhan Mantri Kaushal Vikas Yojana 4.0', 'PMKVY 4.0', 'Ministry of Skill Development and Entrepreneurship', 'Ministry of Skill Development and Entrepreneurship', 'Central', 'Skill & Employment',
  'Free skill training and certification with placement assistance', 'Subsidy & Grant', 'One-time', 'Youth, including school and college dropouts and unemployed individuals, seeking industry-recognized short-term skill certification.', 'Rolling (Continuous, cohort-based)',
  'pmkvyofficial.org', '14 Sep 2026', '7 - 15 days for enrolment; training duration varies by job role', 'Low', 'Free, industry-aligned short-term skill training under the National Skill Qualification Framework, covering fresh certification and Recognition of Prior Learning, with placement linkage and a reward for candidates who complete certification.',
  600000, 15, 45, ARRAY['All'], ARRAY['All India'],
  '[{"id":"pk1","label":"Age Eligibility","requirement":"Indian national aged 15 to 45 years"},{"id":"pk2","label":"Not in Full-time Formal Education","requirement":"Should not be currently enrolled in full-time formal education for the fresh-candidate track"},{"id":"pk3","label":"Minimum Qualification for Job Role","requirement":"Meets the minimum qualification prescribed for the chosen job role"}]'::jsonb, '[{"id":"pk1","name":"Aadhaar Card"},{"id":"pk2","name":"Educational Qualification Certificate"},{"id":"pk3","name":"Bank Passbook"},{"id":"pk4","name":"Passport Photo"}]'::jsonb, ARRAY['Register on the Skill India Digital portal', 'Select a training centre and job role aligned to National Occupational Standards', 'Attend training and appear for the skill assessment', 'Certification issued by the relevant Sector Skill Council on passing', 'Placement assistance provided through the registered employer network']
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
  'ignoaps-nsap-2026', 'Indira Gandhi National Old Age Pension Scheme (NSAP)', 'IGNOAPS', 'Department of Rural Development', 'Ministry of Rural Development', 'Central', 'Social Welfare & Pension',
  '₹200 - ₹500 / month (Central share; states commonly add a top-up)', 'Direct Benefit Transfer', 'Monthly', 'Citizens aged 60 and above from Below Poverty Line households, under the National Social Assistance Programme.', 'Rolling (Continuous)',
  'nsap.nic.in', '16 Sep 2026', '30 - 45 days', 'Low', 'Monthly non-contributory pension for elderly citizens from Below Poverty Line households -- ₹200 per month for ages 60-79, rising to ₹500 per month for age 80 and above (Central share), typically supplemented by state government top-ups.',
  100000, 60, 100, ARRAY['All'], ARRAY['All India'],
  '[{"id":"ig1","label":"Below Poverty Line Household","requirement":"Belongs to a household listed in the state Below Poverty Line list"},{"id":"ig2","label":"Minimum Age Requirement","requirement":"Age 60 years or above as per Aadhaar or birth record"},{"id":"ig3","label":"No Overlapping Pension","requirement":"Not already receiving a pension under any other government pension scheme"}]'::jsonb, '[{"id":"ig1","name":"Aadhaar Card"},{"id":"ig2","name":"BPL Ration Card / State BPL Certificate"},{"id":"ig3","name":"Age Proof"},{"id":"ig4","name":"Bank Passbook"}]'::jsonb, ARRAY['Apply at the Gram Panchayat, Urban Local Body, or online state NSAP portal', 'BPL list and age verification by the Village Revenue Officer', 'Sanction order issued by the District Social Welfare Officer', 'Pension activated for monthly transfer via PFMS', 'Annual life-certificate verification through Jeevan Pramaan e-KYC']
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
  'atal-pension-yojana-2026', 'Atal Pension Yojana', 'APY', 'Department of Financial Services', 'Ministry of Finance (PFRDA)', 'Central', 'Social Welfare & Pension',
  '₹1,000 - ₹5,000 / month guaranteed pension after age 60', 'Direct Benefit Transfer', 'Monthly', 'Unorganized sector workers aged 18-40 without access to formal pension coverage.', 'Rolling (Continuous)',
  'npscra.nsdl.co.in', '9 Sep 2026', '7 - 10 days for account activation', 'Low', 'Contributory pension scheme guaranteeing a fixed monthly pension of ₹1,000 to ₹5,000 after age 60, based on the subscriber-chosen contribution slab and age of joining, with government co-contribution for early eligible subscribers.',
  250000, 18, 40, ARRAY['All'], ARRAY['All India'],
  '[{"id":"ap1","label":"Not an Income-Tax Payee","requirement":"Applicant should not be an income-tax assessee as per current eligibility rules"},{"id":"ap2","label":"Active Savings Account","requirement":"Holds a savings bank account or post office savings account"},{"id":"ap3","label":"Aadhaar-linked Mobile Number","requirement":"Mobile number linked to Aadhaar for e-KYC and auto-debit mandate"}]'::jsonb, '[{"id":"ap1","name":"Aadhaar Card"},{"id":"ap2","name":"Bank Passbook / Savings Account Details"},{"id":"ap3","name":"Aadhaar-linked Mobile Number"}]'::jsonb, ARRAY['Approach a bank or post office branch, or apply via net-banking or the UMANG app', 'Choose a pension slab between ₹1,000 and ₹5,000 based on joining age', 'Set up an auto-debit mandate for monthly, quarterly, or annual contribution', 'Permanent Retirement Account Number (PRAN) generated', 'Guaranteed pension begins on attaining 60 years of age']
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
  'stand-up-india-2026', 'Stand-Up India Scheme', 'Stand-Up India', 'Department of Financial Services', 'Ministry of Finance', 'Central', 'Micro & Small Business',
  '₹10,00,000 - ₹1,00,00,000 bank loan', 'Credit / Loan Support', 'One-time', 'SC/ST and women entrepreneurs setting up a new greenfield enterprise in manufacturing, services, trading, or agri-allied sectors.', 'Rolling (Continuous)',
  'standupmitra.in', '11 Sep 2026', '30 - 45 days', 'High', 'Facilitates bank loans between ₹10 lakh and ₹1 crore to at least one SC/ST borrower and one woman borrower per bank branch for setting up a new greenfield enterprise, as a composite loan covering both term loan and working capital.',
  2500000, 18, 65, ARRAY['All', 'Female'], ARRAY['All India'],
  '[{"id":"si1","label":"SC/ST or Woman Entrepreneur Category","requirement":"Applicant must be from the SC/ST category and/or a woman entrepreneur"},{"id":"si2","label":"New Greenfield Enterprise","requirement":"The enterprise must be a new venture and not an expansion of an existing business"},{"id":"si3","label":"Controlling Stake Requirement","requirement":"Borrower must hold at least 51% shareholding or controlling stake for non-individual entities"}]'::jsonb, '[{"id":"si1","name":"Aadhaar & PAN Card"},{"id":"si2","name":"Caste Certificate (if applicable)"},{"id":"si3","name":"Detailed Project Report"},{"id":"si4","name":"Udyam Registration Certificate"}]'::jsonb, ARRAY['Register on the Stand-Up India portal or approach a nominated bank branch', 'Submit the project report and promoter background', 'Receive handholding support for DPR refinement and skill training if required', 'Bank appraisal and composite loan sanction', 'Loan disbursal with mentoring support during initial operations']
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
  'pm-fasal-bima-2026', 'Pradhan Mantri Fasal Bima Yojana', 'PMFBY', 'Department of Agriculture and Farmers Welfare', 'Ministry of Agriculture and Farmers Welfare', 'Central', 'Agriculture & Farmers',
  'Sum insured per notified crop (farmer premium capped at 1.5% - 5%)', 'Subsidy & Grant', 'Annual', 'Loanee and non-loanee farmers, including sharecroppers and tenant farmers, growing notified crops in notified areas.', 'Season-bound (Kharif: Jul; Rabi: Dec)',
  'pmfby.gov.in', '23 Sep 2026', '45 - 60 days post-harvest for claim settlement', 'Medium', 'Crop insurance scheme protecting farmers against yield loss from natural calamities, pests, and diseases, with farmers paying only a nominal premium of 2% for Kharif crops, 1.5% for Rabi crops, and 5% for commercial and horticultural crops, with the balance actuarial premium subsidized by the Centre and State.',
  1000000, 18, 80, ARRAY['All'], ARRAY['All India'],
  '[{"id":"fb1","label":"Cultivating Farmer of Notified Crop","requirement":"Must be an owner, tenant, or sharecropper cultivator of a notified crop in a notified area"},{"id":"fb2","label":"Enrollment Before Cut-off Date","requirement":"Enrollment must be completed within the cut-off date of the relevant crop season"},{"id":"fb3","label":"Aadhaar-seeded Bank Account","requirement":"Aadhaar-seeded bank account required for premium debit and claim credit"}]'::jsonb, '[{"id":"fb1","name":"Aadhaar Card"},{"id":"fb2","name":"Land Record (7/12 Extract) or Tenant Farmer Declaration"},{"id":"fb3","name":"Bank Passbook"},{"id":"fb4","name":"Sowing Certificate"}]'::jsonb, ARRAY['Apply through a bank branch, Common Service Centre, or the National Crop Insurance Portal', 'Declare the crop, area sown, and land record details', 'Subsidized premium debited before the season cut-off date', 'Yield assessment conducted through Crop Cutting Experiments post-harvest', 'Claim amount credited directly to the Aadhaar-linked bank account']
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
  'mjpjay-2026', 'Mahatma Jyotiba Phule Jan Arogya Yojana', 'MJPJAY', 'Public Health Department', 'Government of Maharashtra', 'State (Maharashtra)', 'Healthcare & Wellness',
  '₹5,00,000 / family / year (integrated with PM-JAY)', 'Health Insurance', 'Annual', 'Orange, yellow, and Antyodaya ration card holders in Maharashtra, farmers in distress-notified districts, and PM-JAY eligible families.', 'Rolling (Continuous)',
  'jeevandayee.gov.in', '25 Sep 2026', 'Instant e-card issue; cashless at admission', 'Low', 'State health assurance scheme, integrated with Ayushman Bharat PM-JAY, providing cashless treatment up to ₹5 lakh per family per year across a wide range of empanelled procedures at network hospitals in Maharashtra.',
  100000, 0, 100, ARRAY['All'], ARRAY['Maharashtra'],
  '[{"id":"mj1","label":"Eligible Ration Card Holder","requirement":"Holds a valid Yellow, Orange, or Antyodaya ration card, or a White card in a distress-notified district","ruleCode":"MAHA-DOM-SEC3"},{"id":"mj2","label":"Family Database Listing","requirement":"Family listed under the PM-JAY SECC database or the state ration card database"},{"id":"mj3","label":"Aadhaar-linked Family Identification","requirement":"Family members verifiable via Aadhaar for health card issuance"}]'::jsonb, '[{"id":"mj1","name":"Aadhaar Card"},{"id":"mj2","name":"Ration Card (Yellow / Orange / White)"},{"id":"mj3","name":"Maharashtra Domicile Certificate"}]'::jsonb, ARRAY['Visit the empanelled hospital Arogyamitra help desk or a Common Service Centre', 'Aadhaar and ration card verification', 'Complete e-KYC and health card generation', 'Pre-authorization for planned treatment by the hospital medical team', 'Cashless treatment and discharge with no out-of-pocket cost for covered procedures']
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
  'cmchis-tn-2026', 'Chief Minister''s Comprehensive Health Insurance Scheme', 'CMCHIS', 'Health and Family Welfare Department', 'Government of Tamil Nadu', 'State (Tamil Nadu)', 'Healthcare & Wellness',
  '₹5,00,000 / family / year', 'Health Insurance', 'Annual', 'Tamil Nadu ration card holders with family annual income up to ₹1,20,000 (₹72,000 for rural households), covering over 1,000 medical and surgical procedures.', 'Rolling (Continuous)',
  'cmchistn.gov.in', '17 Sep 2026', 'Instant e-card issue; cashless at admission', 'Low', 'Cashless health insurance cover up to ₹5 lakh per family per year for eligible ration card holders in Tamil Nadu, covering major surgeries, critical illness treatment, and follow-up care at network hospitals.',
  120000, 0, 100, ARRAY['All'], ARRAY['Tamil Nadu'],
  '[{"id":"cm1","label":"Domicile of Tamil Nadu","requirement":"Must hold a valid family ration card issued in Tamil Nadu","ruleCode":"TN-DOM-SEC1"},{"id":"cm2","label":"Family Income Limit","requirement":"Family annual income does not exceed ₹1,20,000 (₹72,000 for rural households)"},{"id":"cm3","label":"Aadhaar-linked Ration Card","requirement":"Ration card linked with Aadhaar for e-verification"}]'::jsonb, '[{"id":"cm1","name":"Aadhaar Card"},{"id":"cm2","name":"Family Ration Card"},{"id":"cm3","name":"Income Certificate (if not captured in ration database)"}]'::jsonb, ARRAY['Register at the nearest network hospital CMCHIS help desk or e-Sevai Centre', 'Ration card and Aadhaar cross-verification', 'CMCHIS smart card or e-card issuance', 'Pre-authorization for the listed procedure by the treating hospital', 'Cashless treatment settled directly between the insurer and hospital']
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
