import { IdGenerator } from "../repositories/idGenerator.js";

export class InMemoryClassIdGenerator implements IdGenerator {
  private count: number;

  constructor() {
    this.count = 0;
  }

  generate(): string {
    const newId: string = 'class-' + this.count;
    this.count++;
    return newId;
  }
}
