import type { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import passport from './config/passportConfig.js';
import authRoutes from './routes/authRoutes.js';
import { pinoHttp } from 'pino-http';
import logger from './utils/logger.js';
import userRoutes from './routes/userRoutes.js';


const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET environment variable must be set');
}
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(pinoHttp({ logger }));


app.get('/', (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.use((err: Error, req: Request, res: Response, next: Function) => {
  req.log.error({ err }, 'Unhandled error');
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
