// Load environment variables as early as possible
import dotenv from 'dotenv';
dotenv.config();

// -------------------------
// External Module Imports
// -------------------------
import express, { type Request, type Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { pinoHttp } from 'pino-http';

// -------------------------
// Internal Module Imports
// -------------------------
import { Database } from './db/db.js';
import { UserModel } from './models/UserModel.js';
import { UserService } from './services/UserService.js';
import { UserController } from './controllers/UserController.js';
import { AuthController } from './controllers/AuthController.js';

import logger from './utils/logger.js';

import { configurePassport } from './config/passportConfig.js';
import { createLocalStrategy } from './strategies/localStrategy.js';

import { createUserRouter } from './routes/userRouter.js';
import { createAuthRouter } from './routes/authRouter.js';

// -------------------------
// Dependency Initialization
// -------------------------
const db = new Database();
const userModel = new UserModel(db);
const userService = new UserService(userModel);
const userController = new UserController(userService);
const authController = new AuthController(userService);

// -------------------------
// Passport Configuration
// -------------------------
const passport = configurePassport(userService);
passport.use(createLocalStrategy(userService));

// -------------------------
// Express Application Setup
// -------------------------
const app = express();

// Register built-in and third-party middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// -------------------------
// Session Configuration
// -------------------------
const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET environment variable must be set');
}
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport and Pino HTTP logger
app.use(passport.initialize());
app.use(passport.session());
app.use(pinoHttp({ logger }));

// -------------------------
// Route Definitions
// -------------------------
const userRouter = createUserRouter(userController);
const authRouter = createAuthRouter(authController);


app.get('/', (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.use('/auth', authRouter);
app.use('/users', userRouter);

// -------------------------
// Global Error Handling
// -------------------------
app.use((err: Error, req: Request, res: Response, next: Function) => {
  req.log.error({ err }, 'Unhandled error');
  res.status(500).json({ error: 'Internal Server Error' });
});

// -------------------------
// Export Express App
// -------------------------
export default app;
