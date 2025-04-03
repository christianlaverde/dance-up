/**
 * StudioService
 */

import type { Studio } from "../domain/studio.js";
import type { Class } from "../domain/class.js";
import { IStudioRepository } from "../repositories/IStudioRepository.js";
import { IClassRepository } from "../repositories/IClassRepository.js";

export class StudioService {
  private studioRepository: IStudioRepository;
  private classRepository: IClassRepository;

  constructor(studioRepository: IStudioRepository, classRepository: IClassRepository) {
    this.studioRepository = studioRepository;
    this.classRepository = classRepository;
  }

  /**
   * Retrieve all studios from the database.
   * @returns Promise that resolves to an array of Studio entities.
   */
  async getAllStudios(): Promise<Studio[]> {
    const studios = await this.studioRepository.getAllStudios();
    await Promise.all(studios.map(async (studio) => {
      const studioId = studio.getId();
      const classes = await this.classRepository.getClassesByStudioId(studioId);
      studio.setClasses(classes);
    }));
    return studios;
  }

/*
  async getStudioById(id: string): Promise<Studio | null> {
    const studio = await this.studioModel.getStudioById(id);
    return studio || null;
  }
*/
  /**
  * Retrieve all studio members from a studio given a studio id.
  * @param studioId - the id of the studio
  * @returns Promise that resolves to an array of .
  */
/*
  async getAllStudioMembers(studioId: string): Promise<User[]> {
    const studios = await this.studioModel.getAllStudioMembers(studioId);
    return studios;
  }
*/
}
