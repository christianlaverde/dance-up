import { IdGenerator } from '../repositories/idGenerator.js';

export class InMemoryUserIdGenerator implements IdGenerator {
  private count: number;

  constructor() {
    this.count = 0;
  }

  generate(): string {
    const newId: string = 'user-' + this.count;
    this.count++;
    return newId;
  }
}
