/**
 * StudioService
 *
 * This service encapsulates all business logic related to studios.
 * It acts as a bridge between the controller layer and the data access layer (StudioModel).
 * Each method here delegates data retrieval or manipulation tasks to the StudioModel,
 * while also handling any business-specific rules or error conditions.
 * 
 */

import type { StudioModel } from "../models/studioModel.js";
import type { Studio } from "../domain/studio.js";
//import type { UserService } from "./userService.js";
import type { User } from '../entities/user.js';



export class StudioService {
  // Instance of StudioModel used to interact with the database.
  private studioModel: StudioModel;
  //private userService: UserService;

  /**
   * Constructor for StudioService.
   * @param studioModel - An instance of StudioModel for data access operations.
   */
  //constructor(studioModel: StudioModel, userService: UserService) {
  constructor(studioModel: StudioModel) {
    this.studioModel = studioModel;
    //this.userService = userService;
  }

  /**
   * Retrieve all studios from the database.
   * @returns Promise that resolves to an array of Studio entities.
   */
  async getAllStudios(): Promise<Studio[]> {
    const studios = await this.studioModel.getAllStudios();
    return studios;
  }

  async getStudioById(id: string): Promise<Studio | null> {
    const studio = await this.studioModel.getStudioById(id);
    return studio || null;
  }

  /**
  * Retrieve all studio members from a studio given a studio id.
  * @param studioId - the id of the studio
  * @returns Promise that resolves to an array of .
  */
  async getAllStudioMembers(studioId: string): Promise<User[]> {
    const studios = await this.studioModel.getAllStudioMembers(studioId);
    return studios;
  }
}
