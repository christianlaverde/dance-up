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
import type { Studio } from "../models/studio.js";
import type { UserModel } from "../models/userModel.js";
import type { User } from '../models/user.js';


export class StudioService {
  // Instance of StudioModel used to interact with the database.
  private studioModel: StudioModel;
  private userModel: UserModel;

  /**
   * Constructor for StudioService.
   * @param studioModel - An instance of StudioModel for data access operations.
   */
  constructor(studioModel: StudioModel, userModel: UserModel) {
    this.studioModel = studioModel;
    this.userModel = userModel;
  }

  /**
   * Retrieve all studios from the database.
   * @returns Promise that resolves to an array of Studio entities.
   */
  async getAllStudios(): Promise<Studio[]> {
    const studios = await this.studioModel.getAllStudios();
    return studios;
  }

   /**
    * Retrieve all studio members from a studio given a studio id.
    * @returns Promise that resolves to an array of .
    */
  async getAllStudioMembers(studioId: string): Promise<User[]> {
      const studios = await this.studioModel.getAllStudioMembers(studioId);
      return studios;
    }

   /**
   * Retrieve all studio members from a studio given a studio id.
   * @returns Promise that resolves to an array of .
   */
   async addStudioMember(studioId: string, userId: string): Promise<User> {
        const addedMemberId = await this.studioModel.addStudioMember(studioId, userId);
        const addedMember = await this.userModel.getUserById(addedMemberId);
        return addedMember;
      }
}
