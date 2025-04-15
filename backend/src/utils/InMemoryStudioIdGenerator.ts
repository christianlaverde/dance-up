import { IdGenerator } from "../repositories/idGenerator.js";

export class InMemoryStudioIdGenerator implements IdGenerator {
  private count: number;

  constructor() {
    this.count = 0;
  }

  generate(): string {
    const newId: string = 'studio-' + this.count;
    this.count++;
    return newId;
  }
}