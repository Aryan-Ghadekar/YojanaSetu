import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { env } from './lib/env.js';
import { schemesRouter } from './routes/schemes.js';
import { profileRouter } from './routes/profile.js';
import { applicationsRouter } from './routes/applications.js';
import { documentsRouter } from './routes/documents.js';
import { adminRouter } from './routes/admin.js';

const app = express();

app.use(cors({ origin: env.clientOrigins }));
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/schemes', schemesRouter);
app.use('/api/profile', profileRouter);
app.use('/api/applications', applicationsRouter);
app.use('/api/documents', documentsRouter);
app.use('/api/admin', adminRouter);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(env.port, () => {
  console.log(`YojanaSetu API listening on http://localhost:${env.port}`);
});
