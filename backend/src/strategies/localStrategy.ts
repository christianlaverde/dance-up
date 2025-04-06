import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from 'bcrypt';
import logger from 'utils/logger.js';
import { UserService } from "services/userService.js";

/**
 * Factory function to create and configure a Passport LocalStrategy.
 *
 * This strategy authenticates users using their email and password.
 * It leverages the provided UserService to retrieve user data and uses bcrypt
 * to compare the plaintext password with the stored password hash.
 *
 * @param userService - An instance of UserService to access user data.
 * @returns A configured instance of Passport LocalStrategy.
 */
export function createLocalStrategy(userService: UserService): LocalStrategy {
  // Configuration options for the LocalStrategy.
  // The `usernameField` is set to 'email' to indicate that the user's email is used
  // as the username, and the `passwordField` is 'password'.
  const options = {
    usernameField: 'email',
    passwordField: 'password',
  };

  /**
   * Verify callback function for Passport LocalStrategy.
   *
   * This function is called when a user tries to authenticate. It performs the following:
   * 1. Logs the authentication attempt.
   * 2. Retrieves the user by email using UserService.
   * 3. Compares the provided password with the stored password hash using bcrypt.
   * 4. Calls `done` with the authenticated user if successful, or an error message if not.
   *
   * @param email - The email provided during login.
   * @param password - The plaintext password provided during login.
   * @param done - Passport callback to signal success or failure of authentication.
   */
  const verifyCallback = async (email: string, password: string, done: Function) => {
    try {
      // Log that the local strategy is in use
      logger.info('Using Passport LocalStrategy');

      // Retrieve the user using their email
      const user = await userService.getUserByEmail(email);

      if (user) {
        // Compare the provided password with the stored password hash
        const isMatch = await bcrypt.compare(password, user.getPasswordHash());
        if (!isMatch) {
          // Password mismatch: authentication failed
           return done(null, false, { message: 'Incorrect email or password.' });
        }
        // Authentication successful: return the user object
        return done(null, user);
      }
      else {
        // User not found: authentication failed
        return done(null, false, { message: 'Incorrect email or password.' });
      }
    } catch (err: any) {
      // If error is catched, pass the error to the done callback.
      return done(err);
    }
  };

  // Instantiate and return a new LocalStrategy with the given options and verify callback.
  return new LocalStrategy(options, verifyCallback);
}