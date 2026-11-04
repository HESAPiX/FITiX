import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
const port = Number(process.env.PORT ?? 4000);
const allowedOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:5173';

app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: allowedOrigin.split(',').map(value => value.trim()) }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'fitix-api', timestamp: new Date().toISOString() });
});

app.get('/api/v1', (_req, res) => {
  res.status(200).json({ name: 'FITiX API', version: '0.1.0', status: 'foundation' });
});

app.listen(port, () => {
  console.log(`FITiX API listening on http://localhost:${port}`);
});

export default app;
