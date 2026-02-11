import cors from 'cors';
import express from 'express';
import tradeRoutes from './routes/tradeRoutes.js';

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || '*'
  })
);
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', tradeRoutes);

app.use((err, _req, res, _next) => {
  const statusCode = err.name === 'ValidationError' ? 400 : 500;
  res.status(statusCode).json({
    message: err.message || 'Server error'
  });
});

export default app;
