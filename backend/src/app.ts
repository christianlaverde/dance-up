import type { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.use('/users', userRoutes);

app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error('Error caught:', err);
  // Verify that res.status is available before using it.
  if (res && typeof res.status === 'function') {
    res.status(500).json({ message: 'Internal Server Error' });
  } else {
    // Fallback: log the issue and try to end the response.
    console.error('Unexpected res object:', res);
    next(err);
  }
});

export default app;
