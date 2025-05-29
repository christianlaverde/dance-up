import { Router } from 'express';
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
  const router = Router();

  // Route: GET /studios 
  // Purpose: Retrieve all studio data
  router.get('/', studioController.getAllStudiosWithClasses);
  // Route: GET /studios/:id
  // Purpose: Retrieve studio data by id
  router.get('/:id', studioController.getStudioWithClassesById);
  // Route GET /studios/:id/classes
  // Purpose: Retrieve studio classes only by id
  router.get('/:id/classes', studioController.getStudioClassesById);
  // Route GET /studios/:studioId/classes/:classId
  // Purpose: Retrieve class data from a studio by id
  router.get('/:studioId/classes/:classId', studioController.getStudioClassById);


  // Route: POST /studios
  // Purpose: Create a new studio
  router.post('/', studioController.createStudio);
  // Route: POST /studios/:id/classes
  // Purpose: Create a new class and assign it to studio given by id
  router.post('/:id/classes', studioController.createStudioClass);


  // Route: PUT /studios/:studioId/classes/:classId
  // Purpose: Update class data from a studio by id
  router.put('/:studioId/classes/:classId', studioController.updateStudioClassById);

  // Route: GET /:id/members
  // Purpose: Retrieve all studio members of a studio given a studio id
  //router.get('/:id/members', studioController.getStudioMembers);

  return router;
}
