import passport from "passport";
import logger from '../utils/logger.js';
import { localStrategy } from "../strategies/localStrategy.js";
import { User } from "../models/User.entity.js";
import { getUserById } from "../services/UserService.js";

passport.use(localStrategy);

passport.serializeUser((user: User, done) => {
  logger.info('Serializing User: ', user);
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  logger.info('Deserializing User');
  try {
    const user: User | null = await getUserById(id);
    logger.info('Deserialized User: ', user);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;