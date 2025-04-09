import { Studio } from '../domain/studio.js';
import { IStudioRepository } from "./iStudioRepository.js";


export class InMemoryStudioRepository implements IStudioRepository {
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
    if (!studio.getId()) throw new Error('Studio ID must be set');
    this.studios.set(studio.getId()!, studio);
  }
}