import express, { Router } from 'express';
import { StudioController } from '../controllers/studioController.js';

/**
 * Creates and configures an Express router for studio-related endpoints.
 *
 * This factory function receives an instance of StudioController and sets up
 * the routes by linking HTTP endpoints to the appropriate controller methods.
 *
 * @param studioController - An instance of UserController that handles studio logic.
 * @returns {Router} - A configured Express router with studio routes.
 */
export function createStudioRouter(studioController: StudioController): Router {
  const router = express.Router();

  // Route: GET /studios 
  // Purpose: Retrieve all studios.
  router.get('/', studioController.getAllStudiosWithClasses);
  // Route: GET /studios/:id
  // Purpose: Retrieve studio by id
  router.get('/:id', studioController.getStudioWithClassesById);

  // Route: POST /studios
  // Purpose: Create a new studio
  router.post('/', studioController.createStudio);
  

  // Route: GET /:id/members
  // Purpose: Retrieve all studio members of a studio given a studio id
  //router.get('/:id/members', studioController.getStudioMembers);

  return router;
}