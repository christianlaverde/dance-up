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

// -------------------------
// Internal Module Imports
// -------------------------
import { InMemoryStudioRepository } from './repositories/inMemoryStudioRepository.js';
import { StudioService } from './services/studioService.js';
import { StudioController } from './controllers/studioController.js';
import { AuthController } from './controllers/authController.js';

import logger from './utils/logger.js';
import { httpLogger } from './utils/logger.js';

import { configurePassport } from './config/passportConfig.js';
import { createLocalStrategy } from './strategies/localStrategy.js';

import { createUserRouter } from './routes/userRouter.js';
import { createStudioRouter } from './routes/studioRouter.js';
import { createAuthRouter } from './routes/authRouter.js';
import { InMemoryIdGenerator } from './utils/InMemoryIdGenerator.js';
import { setupInMemoryDb } from './utils/setupInMemoryDb.js';

// -------------------------
// Dependency Initialization
// -------------------------
const studioRepository = new InMemoryStudioRepository();
const idGen = new InMemoryIdGenerator();
const studioService = new StudioService(studioRepository, idGen);
const studioController = new StudioController(studioService);

setupInMemoryDb(studioService);

// -------------------------
// Passport Configuration
// -------------------------
/*
const passport = configurePassport(userService);
passport.use(createLocalStrategy(userService));
*/

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
/*
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
*/

// Initialize Passport and Pino HTTP logger
/*
app.use(passport.initialize());
app.use(passport.session());
*/
app.use(httpLogger);

// -------------------------
// Route Definitions
// -------------------------
const studioRouter = createStudioRouter(studioController);
//const authRouter = createAuthRouter(authController);

app.get('/', (req: Request, res: Response) => {
  const resp = {
    status: "success"
  }
  res.send(resp);
});

/*
app.use('/auth', authRouter);
app.use('/users', userRouter);
*/
app.use('/studios', studioRouter);

// -------------------------
// Global Error Handling
// -------------------------
app.use((err: Error, req: Request, res: Response, next: Function) => {
  logger.error(err);
  req.log.error({ err }, 'Unhandled error');
  res.status(500).json({ error: 'Internal Server Error' });
});

// -------------------------
// Export Express App
// -------------------------
export default app;
