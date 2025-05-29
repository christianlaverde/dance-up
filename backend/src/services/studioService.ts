/**
 * StudioService
 */

import { Studio } from "../domain/studio.js";
import { Class } from "../domain/class.js";
import { IStudioRepository } from "../repositories/iStudioRepository.js";
import { CreateStudioDto } from "../dto/createStudioDto.js";
import { IClassRepository } from "../repositories/iClassRepository.js";
import { CreateClassDto } from "../dto/createClassDto.js";


export class StudioService {
  constructor(
    private readonly studioRepository: IStudioRepository,
    private readonly classRepository: IClassRepository,
  ) { }

  async getAllStudios(): Promise<Studio[]> {
   const studios = await this.studioRepository.findAll();
   return studios;
  }

  async getStudioById(studioId: string): Promise<Studio | null> {
   const studio = await this.studioRepository.findById(studioId);
   return studio ?? null;
  }

  async createStudio(createStudioDto: CreateStudioDto): Promise<Studio> {
    const studioOpts = {id: undefined, ...createStudioDto};
    const studio = new Studio(studioOpts);
    await this.studioRepository.save(studio);
    return studio;
  }

  async createStudioClass(studioId: string, createClassDto: CreateClassDto): Promise<Class | null> {
    if (!studioId) throw new Error('Cannot add class to unsaved studio.');
    const studio = await this.studioRepository.findById(studioId);
    if (studio) {
      const newClassOpts = { id: undefined, ...createClassDto};
      const newClass = new Class(newClassOpts);
      await this.classRepository.save(newClass);
      studio.setClass(newClass);
      await this.studioRepository.save(studio);
      return newClass;
    }
    return null;
  }

  async updateStudioClass(studioId: string, cls: Class): Promise<Class | null> {
    const studio = await this.studioRepository.findById(studioId);
    if (studio) {
      studio.setClass(cls);
      await this.studioRepository.save(studio);
    }
    return null;
  }

  async deleteStudioClass(studioId: string, clsId: string): Promise<boolean> {
    const studio = await this.studioRepository.findById(studioId);
    let deleted = false;
    if (studio) {
      deleted = studio.deleteClass(clsId);
    }
    return deleted;
  }
}
