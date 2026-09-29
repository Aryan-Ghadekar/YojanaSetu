# YojanaSetu API

Express + TypeScript backend that connects the YojanaSetu frontend to Supabase
(Postgres, Auth, and Storage). All frontend feature `api.ts` files call this
service instead of reading local mock data.

## 1. Set up Supabase

1. In your Supabase project's SQL editor, run `supabase/schema.sql` (creates
   tables, RLS, the profile-creation trigger, and the `documents` storage bucket).
2. Run `supabase/seed.sql` to load the reference scheme catalog and district
   analytics reporting data.
3. From **Project Settings -> API**, copy:
   - `Project URL` -> `SUPABASE_URL` (server) and `VITE_SUPABASE_URL` (client)
   - `anon public` key -> `VITE_SUPABASE_ANON_KEY` (client only)
   - `service_role` key -> `SUPABASE_SERVICE_ROLE_KEY` (server only - never expose to the client)

## 2. Configure environment variables

```
cp .env.example .env
# fill in SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
```

Also copy `client/.env.example` to `client/.env` and fill in
`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `VITE_API_URL` (defaults to
`http://localhost:4000`).

## 3. Run it

```
npm install
npm run dev
```

The API listens on `PORT` (default 4000). `GET /api/health` is a liveness check.

## How auth works

The frontend uses Supabase Auth directly (sign up / sign in / session) via
`@supabase/supabase-js`. Every other request from the frontend goes to this
API with `Authorization: Bearer <supabase access token>`. This server verifies
that token against Supabase, looks up the caller's role from `profiles`, and
uses the Supabase **service role** key to read/write Postgres and Storage -
Row Level Security is enabled on every table as defense in depth, but with no
policies defined for `anon`/`authenticated`, only this backend's service role
can actually reach the data.

New sign-ups automatically get a `profiles` row via a Postgres trigger
(`handle_new_user`), seeded from the `role` and `full_name` passed in
Supabase Auth's `user_metadata` at sign-up time.

## Document OCR and field extraction

`POST /api/documents` runs each upload through a Python OCR service (`ocr-service/`, ported
from the Team-18 project) before saving the row:

1. **Text extraction** - PDFs with a real text layer are read directly (PyMuPDF); images and
   scanned PDFs are rasterized and read with PaddleOCR.
2. **Quality check** - blur (variance of the Laplacian: `<100` Blurry, `100-500` Borderline,
   `>=500` Sharp) and resolution (long edge >= 1000px and short edge >= 700px). Sets `quality_status`.
3. **Field extraction** - Gemini maps the OCR text to canonical fields (name, DOB, Aadhaar, PAN,
   address, bank details, ...). Fields it is unsure of stay empty.
4. **Comparison** - `src/lib/documentAnalysis.ts` compares extracted values with the citizen's
   profile (name, DOB, gender, state, district, occupation, income) and sets `verification_status`.
   The per-field `confidence` is a heuristic (text source, blur, format validity), not a model probability.

If the OCR service is unset or fails, the file is still stored with `ocr_status = failed` and
`verification_status = Unable to Verify`.

### Run the OCR service

Needs Python 3.10-3.13 (PaddlePaddle has no 3.14 wheels).

```
cd ocr-service
python3.11 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env      # set GEMINI_API_KEY (and OCR_SERVICE_TOKEN)
python run.py             # http://127.0.0.1:8001
```

Then set `OCR_SERVICE_URL` (and the same `OCR_SERVICE_TOKEN`) in the Express server's `.env`.
The first request is slow while PaddleOCR downloads and loads its models.
