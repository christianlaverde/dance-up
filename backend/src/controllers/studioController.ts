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
import { CreateStudioDto } from '../dto/createStudioDto.js';
import { CreateClassDto } from '../dto/createClassDto.js';

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
   * Handler for retrieving all studios with class arrays initialized
   * Sends a 200 response with the list of studios or a 500 error if something goes wrong.
   *
   * @param req - Express Request object.
   * @param res - Express Response object.
   */
  getAllStudiosWithClasses = async (req: Request, res: Response): Promise<void> => {
    try {
      const studios = await this.studioService.getAllStudios();
      const totalStudioCount = studios.length;
      const resp = {
        data: studios,
        totalCount: totalStudioCount,
        status: 'success'
      }
      res.status(200).json(resp);
    } catch (err) {
      logger.error(err);
      const resp = {
        message: 'Server Error',
        status: 'failure'
      }
      res.status(500).json(resp);
    }
  }

  /**
   * Handler for retrieving a studio by id with classes array initialized
   */
  getStudioWithClassesById = async (req: Request, res: Response): Promise<void> => {
    const studioId = req.params.id;
    try {
      const studio = await this.studioService.getStudioById(studioId);
      if (!studio) {
        const resp = { status: 'failure', message: 'Studio not found' };
        res.status(404).json(resp);
        return;
      }
      const resp = { status: 'success', studio: studio };
      res.status(200).json(resp);
    } catch (err) {
      logger.error(err);
      const resp = { status: 'failure', message: 'Server Error' };
      res.status(500).json(resp);
    }
  }

  getStudioClassesById = async (req: Request, res: Response): Promise<void> => {
    const studioId = req.params.id;
    try {
      const studio = await this.studioService.getStudioById(studioId);
      if (!studio) {
        const resp = { status: 'failure', message: 'Studio not found' };
        res.status(404).json(resp);
        return;
      }
      const classes = studio.getClasses();
      const resp = { status: 'success', data: classes };
      res.status(200).json(resp);
    } catch (err) {
      const resp = { status: 'failure', message: 'Server Error' };
      res.status(500).json(resp);
    }
  }

  createStudio = async (req: Request, res: Response): Promise<void> => {
    // TODO: validate DTO
    const newStudioDto: CreateStudioDto = req.body;
    try {
      const newStudio = await this.studioService.createStudio(newStudioDto);
      if (!newStudio) {
        const resp = { status: 'failure', message: 'Studio could not be created' };
        res.status(500).json(resp);
        return;
      }
      const resp = { status: 'success', studio: newStudio };
      res.status(201).json(resp);
    } catch (err) {
      logger.error(err);
      const resp = { status: 'failure', message: 'Server Error' };
      res.status(500).json(resp);
    }
  }

  createStudioClass = async (req: Request, res: Response): Promise<void> => {
    const studioId = req.params.id;
    const createClassDto: CreateClassDto = req.body;
    console.log('class form data: ', createClassDto);
    try {
      const studio = await this.studioService.getStudioById(studioId);
      if (!studio) {
        const resp = { status: 'failure', message: 'Studio not found' };
        res.status(404).json(resp);
        return;
      }
      const newClass = await this.studioService.createStudioClass(studioId, createClassDto);
      if (!newClass) {
        const resp = { status: 'failure', message: 'Class could not be created' };
        res.status(500).json(resp);
        return;
      }
      const resp = { status: 'success', data: { studioId: studio.getId(), class: newClass } };
      res.status(201).json(resp);
    } catch (err) {
      logger.error(err);
      const resp = { status: 'failure', message: 'Server Error' };
      res.status(500).json(resp);
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
