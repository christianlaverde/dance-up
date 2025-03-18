import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmail } from "../services/user.service";

const options = {
  // usernameField is an email field
  usernameField: 'email',
  passwordField: 'password', 
};

export const localStrategy = new LocalStrategy(
  options,
  async (email: string, password: string, done: Function) => {
    try {
      // Verify user exists by finding them by email
      const user = await getUserByEmail(email);
      if (!user) {
        // No user found, authentication failed
        // False as 2nd param indicates no user was authenticated
        return done(null, false, {message: 'Incorrect email or password.'});
      }

      // After finding user, compare password to stored password
      // TODO: HASH PASSWORD
      
    } catch (err) {
      return done(err);
    }
  }
);
