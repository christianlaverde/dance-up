import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmail } from "../services/userService.js";
import bcrypt from 'bcrypt';

const options = {
  // usernameField is an email field
  usernameField: 'email',
  passwordField: 'password', 
};

export const localStrategy = new LocalStrategy(
  options,
  async (email: string, password: string, done: Function) => {
    try {
      console.log('in localStrategy');
      // Verify user exists by finding them by email
      const user = await getUserByEmail(email);
      if (!user) {
        // No user found, authentication failed
        // False as 2nd param indicates no user was authenticated
        return done(null, false, {message: 'Incorrect email or password.'});
      }
      // After finding user, compare password to stored password
      // TODO: HASH PASSWORD
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return done(null, false, {message: 'Incorrect email or password.'});
      }
      // User Authenticated
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);
