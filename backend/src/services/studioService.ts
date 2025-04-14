/**
 * StudioService
 */

import { Studio } from "../domain/studio.js";
import { Class, ClassOptions } from "../domain/class.js";
import { IStudioRepository } from "../repositories/iStudioRepository.js";
import { CreateStudioDto } from "../dto/CreateStudioDto.js";
import { IdGenerator } from "../repositories/idGenerator.js";


export class StudioService {
  constructor(
    private readonly studioRepository: IStudioRepository,
    private readonly idGen?: IdGenerator
  ) { }

  /**
   * Retrieve all studios from StudioRepository with classes array initialized
   * @returns Promise that resolves to an array of Studio entities.
   */
  async getAllStudios(): Promise<Studio[]> {
   const studios = await this.studioRepository.findAll();
   return studios;
  }

  /**
   * Retrieve a studio from StudioRepository by id with classes array initialized
   * @returns Promise that resolves to a Studio entity with classes array initialized
   */
  async getStudioById(studioId: string): Promise<Studio | null> {
   const studio = await this.studioRepository.findById(studioId);
   return studio ?? null;
  }

  async createStudioClass(studioId: string, classOptions: ClassOptions): Promise<Class | null> {
    if (!studioId) throw new Error('Cannot add class to unsaved studio.');
    const studio = await this.studioRepository.findById(studioId);
    if (studio) {
      const newClass = new Class(classOptions);
      studio.addClass(newClass);
      await this.studioRepository.save(studio);
      return newClass;
    }
    return null;
  }

  async createStudio(createStudioDto: CreateStudioDto): Promise<Studio> {
    const id = this.idGen?.generate() ?? null;
    const studioOpts = {id: id, ...createStudioDto}
    const studio = new Studio(studioOpts);
    await this.studioRepository.save(studio);
    return studio;
  }
}
