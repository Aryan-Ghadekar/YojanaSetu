# AI-Powered-Government-Scheme-Eligibility-Application-Assistant
YojanaSetu is an AI-powered platform that helps individuals and small businesses discover relevant government schemes, verify eligibility using applicant data and documents, estimate benefits, identify missing requirements, and navigate the application process with evidence-backed explanations from official scheme guidelines.

## Project structure

- `client/` - React + Vite frontend
- `server/` - Express + TypeScript API backed by Supabase (Postgres, Auth, Storage) - see [server/README.md](server/README.md) for setup

## Getting started

1. Follow [server/README.md](server/README.md) to create a Supabase project, run the SQL schema/seed, and configure `server/.env`.
2. Copy `client/.env.example` to `client/.env` and fill in the Supabase and API values.
3. From the repo root:

   ```
   npm run install:all
   npm run dev
   ```

   This runs the API (port 4000) and the Vite dev server (port 3000) together.
