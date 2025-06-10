// import passport, { PassportStatic } from "passport";
// import logger from '../utils/logger.js';
// import { User } from "../domain/user.js";
// import { UserService } from "../services/userService.js";

/**
 * Configures Passport with serialization and deserialization logic.
 *
 * This function sets up Passport's session management by defining how a user
 * is serialized into the session (storing only the user ID) and deserialized
 * (retrieving the full user data using the UserService).
 *
 * @param userService - An instance of UserService for fetching user data.
 * @returns The configured Passport instance.
 */
// export function configurePassport(userService: UserService): PassportStatic {
//   // Serialize the user instance to a unique identifier (user.id).
//   // This keeps the session data small and secure.
//   passport.serializeUser((user: User, done) => {
//     logger.info('Serializing User: ', user);
//     done(null, user.getId());
//   });
//
//   // Deserialize the user instance based on the unique identifier stored in the session.
//   // This is invoked on every request that contains a session.
//   passport.deserializeUser(async (id: string, done) => {
//     logger.info('Deserializing User with id: ', id);
//     try {
//       // Retrieve full user details using the UserService
//       const user: User | null = await userService.getUserById(id);
//       logger.info('Deserialized User: ', user);
//       done(null, user);
//     } catch (err) {
//       // Pass any errors to Passport's error handling
//       done(err);
//     }
//   });
//
//   // Return the configured Passport instance for use in the application.
//   return passport;
// }
