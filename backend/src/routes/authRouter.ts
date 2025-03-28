import express, { Router } from 'express';
import type { AuthController } from '../controllers/authController.js';

/**
 * Creates and configures an Express router for authentication endpoints.
 *
 * This factory function accepts an instance of AuthController and sets up the routes
 * for user registration and login. It encapsulates the mapping of HTTP methods and paths
 * to their corresponding controller actions.
 *
 * @param authController - An instance of AuthController that handles authentication logic.
 * @returns {Router} - A configured Express router with authentication routes.
 */
export function createAuthRouter(authController: AuthController): Router {
  const router = express.Router();

  // Route: POST /register
  // Purpose: Registers a new user by delegating the process to AuthController.registerUser.
  router.post('/register', authController.registerUser);

  // Route: POST /login
  // Purpose: Authenticates an existing user by delegating the process to AuthController.loginUser.
  router.post('/login', authController.loginUser);

  return router;
}