import { Studio } from '../domain/studio.js';
import { IStudioRepository } from "./iStudioRepository.js";
import { InMemoryStudioIdGenerator } from '../utils/inMemoryStudioIdGenerator.js';

export class InMemoryStudioRepository implements IStudioRepository {
  private studios: Map<string, Studio>;
  private readonly studioIdGen: InMemoryStudioIdGenerator;

  constructor() {
    this.studios = new Map();
    this.studioIdGen = new InMemoryStudioIdGenerator();
   }

  async findAll(): Promise<Studio[]> {
    return Array.from(this.studios.values());
  }

  async findById(id: string): Promise<Studio | null> {
    return this.studios.get(id) ?? null;
  }

  async save(studio: Studio): Promise<void> {
    const studioId = studio.getId();
    if (studioId === undefined) {
      const id = this.studioIdGen.generate();
      studio.setId(id);
      this.studios.set(id, studio);
    } else {
      this.studios.set(studioId, studio);
    }
  }
}