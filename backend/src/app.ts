import type { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { pinoHttp } from 'pino-http';
import logger from './utils/logger.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(pinoHttp({ logger }));

app.get('/', (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.use('/users', userRoutes);

app.use((err: Error, req: Request, res: Response, next: Function) => {
  req.log.error({ err }, 'Unhandled error');
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
