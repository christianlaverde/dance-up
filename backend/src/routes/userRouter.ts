import express, { Router } from 'express';
import type { UserController } from '../controllers/userController.js';

/**
 * Creates and configures an Express router for user-related endpoints.
 *
 * This factory function receives an instance of UserController and sets up
 * the routes by linking HTTP endpoints to the appropriate controller methods.
 *
 * @param userController - An instance of UserController that handles user logic.
 * @returns {Router} - A configured Express router with user routes.
 */
export function createUserRouter(userController: UserController): Router {
  const router = express.Router();

  // Route: GET / 
  // Purpose: Retrieve all users.
  router.get('/', userController.getUsers);

  // Route: GET /email/:email 
  // Purpose: Retrieve a single user by their email address.
  router.get('/email/:email', userController.getUserByEmail);

  // Route: GET /:id 
  // Purpose: Retrieve a single user by their unique identifier.
  router.get('/:id', userController.getUserById);

  return router;
}