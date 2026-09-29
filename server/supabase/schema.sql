-- YojanaSetu schema
-- Run this in the Supabase SQL editor (or via `supabase db push`) on a fresh project.
-- All application data access happens through the Express API using the service-role
-- key, which bypasses Row Level Security. RLS is still enabled on every table below
-- as defense in depth: with no policies defined, anon/authenticated clients get zero
-- direct access, and only the service role (the backend) can read or write.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- profiles: one row per citizen, keyed to Supabase Auth's auth.users
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'citizen' check (role in ('citizen', 'admin')),
  full_name text not null default '',
  age integer not null default 18,
  date_of_birth date,
  gender text not null default 'Male' check (gender in ('Male', 'Female', 'Transgender', 'Other')),
  state text not null default '',
  district text not null default '',
  taluka text not null default '',
  residence_type text not null default 'Urban' check (residence_type in ('Rural', 'Urban')),
  occupation text not null default '',
  annual_income numeric not null default 0,
  caste_category text not null default 'General' check (caste_category in ('General', 'OBC', 'SC', 'ST', 'EWS')),
  education_level text not null default '',
  family_members integer not null default 1,
  is_student boolean not null default false,
  is_differently_abled boolean not null default false,
  land_holding_acres numeric not null default 0,
  aadhaar_linked boolean not null default false,
  digilocker_connected boolean not null default false,
  completeness_percentage integer not null default 20,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Automatically create a starter profile row whenever a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, role, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'role', 'citizen'),
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- schemes: shared reference catalog of government schemes
-- ---------------------------------------------------------------------------
create table if not exists public.schemes (
  id text primary key,
  name text not null,
  short_name text not null,
  department text not null,
  ministry text not null,
  level text not null,
  category text not null,
  benefit_amount text not null,
  benefit_type text not null,
  benefit_frequency text not null,
  target_audience text not null,
  deadline text,
  official_portal text not null,
  last_verified_date text not null,
  processing_time text not null,
  complexity text not null,
  summary text not null,
  max_income_limit numeric not null,
  min_age integer not null,
  max_age integer not null,
  eligible_genders text[] not null default '{}',
  eligible_states text[] not null default '{}',
  eligibility_criteria jsonb not null default '[]',
  documents jsonb not null default '[]',
  application_steps text[] not null default '{}'
);

alter table public.schemes enable row level security;

-- ---------------------------------------------------------------------------
-- applications: one row per submitted application
-- ---------------------------------------------------------------------------
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  application_number text not null,
  scheme_id text not null references public.schemes (id),
  scheme_name text not null,
  department text not null,
  benefit_amount text not null,
  submitted_date text not null,
  last_updated text not null,
  current_status text not null,
  current_step_index integer not null default 0,
  total_steps integer not null default 5,
  expected_next_step text not null default '',
  action_required_message text,
  action_required_type text,
  timeline jsonb not null default '[]',
  created_at timestamptz not null default now()
);

alter table public.applications enable row level security;
create index if not exists applications_user_id_idx on public.applications (user_id);

-- ---------------------------------------------------------------------------
-- documents: uploaded / DigiLocker-linked citizen documents
-- ---------------------------------------------------------------------------
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  category text not null,
  file_name text not null,
  file_size text not null,
  storage_path text,
  uploaded_at text not null,
  source text not null default 'Upload' check (source in ('Upload', 'DigiLocker')),
  ocr_status text not null default 'complete',
  quality_status text not null default 'readable',
  verification_status text not null default 'Verified',
  authenticity_signals jsonb not null default '{}',
  extracted_fields jsonb not null default '[]',
  created_at timestamptz not null default now()
);

alter table public.documents enable row level security;
create index if not exists documents_user_id_idx on public.documents (user_id);

-- ---------------------------------------------------------------------------
-- admin_district_metrics: district-level welfare utilization reporting data
-- ---------------------------------------------------------------------------
create table if not exists public.admin_district_metrics (
  id serial primary key,
  district text not null,
  state text not null,
  eligible_population integer not null,
  application_volume integer not null,
  approval_rate numeric not null,
  utilization_rate numeric not null,
  unused_funds_crores numeric not null,
  awareness_gap_score text not null check (awareness_gap_score in ('Low', 'Moderate', 'Severe')),
  top_missing_document text not null
);

alter table public.admin_district_metrics enable row level security;

-- ---------------------------------------------------------------------------
-- admin_monthly_trends / admin_rejection_reasons / admin_funnel_stages:
-- platform-wide scheme utilization reporting data
-- ---------------------------------------------------------------------------
create table if not exists public.admin_monthly_trends (
  id serial primary key,
  month text not null,
  sort_order integer not null,
  applications integer not null,
  approved integer not null
);

alter table public.admin_monthly_trends enable row level security;

create table if not exists public.admin_rejection_reasons (
  id serial primary key,
  reason text not null,
  percentage numeric not null,
  color text not null,
  sort_order integer not null
);

alter table public.admin_rejection_reasons enable row level security;

create table if not exists public.admin_funnel_stages (
  id serial primary key,
  stage text not null,
  percentage numeric not null,
  volume_label text not null,
  sort_order integer not null
);

alter table public.admin_funnel_stages enable row level security;

-- ---------------------------------------------------------------------------
-- Storage: bucket for uploaded citizen documents
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('documents', 'documents', false)
on conflict (id) do nothing;
