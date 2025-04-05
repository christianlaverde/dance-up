/**
 * StudioService
 */

import type { Studio } from "../domain/studio.js";
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
   * Retrieve all studios from the StudioRepository with classes array initialized
   * @returns Promise that resolves to an array of Studio entities.
   */
  async getAllStudiosWithClasses(): Promise<Studio[]> {
    const studios = await this.studioRepository.getAllStudios();
    await Promise.all(studios.map(async (studio) => {
      const studioId = studio.getId();
      const classes = await this.classRepository.getClassesByStudioId(studioId);
      studio.setClasses(classes);
    }));
    return studios;
  }


  async getStudioWithClassesById(studioId: string): Promise<Studio | null> {
    const studio = await this.studioRepository.getStudioById(studioId);
    if (studio) {
      const classes = await this.classRepository.getClassesByStudioId(studioId);
      studio.setClasses(classes);
    }
    return studio || null;
  }

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
