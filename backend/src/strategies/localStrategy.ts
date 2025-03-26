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
      const user = await getUserByEmail(email);
      // After finding user, compare password to stored password
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return done(null, false, {message: 'Incorrect email or password.'});
      }
      // User Authenticated
      return done(null, user);
    } catch (err: any) {
      if (err.message === 'User Not Found') {
        return done(null, false, {message: 'Incorrect email or password.'});
      }
      return done(err);
    }
  }
);
