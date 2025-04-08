import { Studio } from '../domain/studio.js';
import { Class } from '../domain/class.js';
import { IStudioRepository } from "./iStudioRepository.js";


export class imStudioRepository implements IStudioRepository {
  private studios: Map<string, Studio>;

  constructor() {
    this.studios = new Map();
   }

  async getAllStudios(): Promise<Studio[]> {
    return Array.from(this.studios.values());
  }

  async getStudioById(id: string): Promise<Studio | null> {
    return this.studios.get(id) || null;
  }

  async saveStudio(studio: Studio): Promise<void> {
    this.studios.set(studio.getId(), studio);
  }
}