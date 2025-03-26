import passport from "passport";
import { localStrategy } from "../strategies/localStrategy.js";
import { User } from "../models/User.entity.js";
import { getUserById } from "../services/userService.js";

passport.use(localStrategy);

passport.serializeUser((user: User, done) => {
  console.log('Serializing user:', user);
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  console.log('in deserializeUser');
  try {
    const user: User | null = await getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;