/**
 * StudioService
 */

import { Studio } from "../domain/studio.js";
import { Class } from "../domain/class.js";
import { IStudioRepository } from "../repositories/iStudioRepository.js";
import { IClassRepository } from "../repositories/iClassRepository.js";
import { CreateClassDto } from "../dto/CreateClassDto.js";


export class StudioService {
  private studioRepository: IStudioRepository;
  private classRepository: IClassRepository;

  constructor(studioRepository: IStudioRepository, classRepository: IClassRepository) {
    this.studioRepository = studioRepository;
    this.classRepository = classRepository;
  }

  /**
   * Retrieve all studios from StudioRepository with classes array initialized
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

  /**
   * Retrieve a studio from StudioRepository by id with classes array initialized
   * @returns Promise that resolves to a Studio entity with classes array initialized
   */
  async getStudioWithClassesById(studioId: string): Promise<Studio | null> {
    const studio = await this.studioRepository.getStudioById(studioId);
    if (studio) {
      const classes = await this.classRepository.getClassesByStudioId(studioId);
      studio.setClasses(classes);
    }
    return studio || null;
  }

  async createStudioClass(studioId: string, createClassDto: CreateClassDto): Promise<Class | null> {
    const studio = await this.studioRepository.getStudioById(studioId);
    if (studio) {
      const createdClass = await this.classRepository.createClass(createClassDto);
      studio.addClass(createdClass);
      return createdClass;
    }
    return null;
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
