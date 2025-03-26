import type { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import passport from './config/passportConfig.js';
import authRoutes from './routes/authRoutes.js';
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


app.get('/', (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.use('/auth', authRoutes);
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
