import { User } from '../domain/user.js';
import { IUserRepository } from './iUserRepository.js';
import { InMemoryUserIdGenerator } from '../utils/inMemoryUserIdGenerator.js';

export class InMemoryUserRepository implements IUserRepository {
  private users: Map<string, User>;
  private readonly userIdGen: InMemoryUserIdGenerator;

  constructor() {
    this.users = new Map();
    this.userIdGen = new InMemoryUserIdGenerator();
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) ?? null;
  }

  async save(user: User): Promise<void> {
    const userId = user.getId();
    if (userId === undefined) {
      const id = this.userIdGen.generate();
      user.setId(id);
      this.users.set(id, user);
    } else {
      this.users.set(userId, user);
    }
  }
}
