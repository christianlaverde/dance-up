/**
 * StudioController
 *
 * This controller handles HTTP requests related to studios.
 * It leverages a StudioService instance to perform business logic,
 * and it returns appropriate HTTP responses.
 *
 * We use arrow functions for controller methods to preserve the correct
 * `this` context when they are passed as callbacks to Express routes.
 * Without arrow functions, the context of `this` might be lost, leading to
 * errors when accessing instance properties (like `this.studioService`).
 * 
 */

import type { Request, Response } from 'express';
import { StudioService } from '../services/studioService.js';
import logger from "../utils/logger.js";

export class StudioController {
  // Instance of StudioService injected via the constructor.
  private studioService: StudioService;

  /**
   * Constructs a new StudioController.
   * @param studioService - An instance of StudioService for handling studio logic.
   */
  constructor(studioService: StudioService) {
    this.studioService = studioService;
  }

  /**
   * Handler for retrieving all studios.
   * Sends a 200 response with the list of studios or a 500 error if something goes wrong.
   *
   * @param req - Express Request object.
   * @param res - Express Response object.
   */
  getStudios = async (req: Request, res: Response): Promise<void> => {
    try {
      const studios = await this.studioService.getAllStudios();
      res.status(200).json(studios);
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  }

  /**
   * Handler for retrieving all studio members from a studio given a studio id
   * If the studio members exists, sends a 200 response with the studio member data.
   * If not, sends a 404 response indicating the studio member was not found.
   *
   * @param req - Express Request object with a parameter `id`.
   * @param res - Express Response object.
   */
  /*
  getStudioMembers = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const studioMembers = await this.studioService.getAllStudioMembers(id);
      if (studioMembers) {
        res.status(200).json(studioMembers);
      } else {
        res.status(404).json({ message: 'Studio Members not found' });
      }
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  */
}