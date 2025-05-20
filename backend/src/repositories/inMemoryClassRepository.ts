import { Class } from '../domain/class.js';
import { IClassRepository } from './iClassRepository.js';
import { InMemoryClassIdGenerator } from '../utils/inMemoryClassIdGenerator.js';

export class InMemoryClassRepository implements IClassRepository {
  private classes: Map<string, Class>;
  private readonly classIdGen: InMemoryClassIdGenerator;

  constructor() {
    this.classes = new Map();
    this.classIdGen = new InMemoryClassIdGenerator();
  }

  async findAll(): Promise<Class[]> {
    return Array.from(this.classes.values());
  }

  async findById(id: string): Promise<Class | null> {
    return this.classes.get(id) ?? null;
  }

  async save(cls :Class): Promise<void> {
    const classId = cls.getId();
    if (classId === undefined) {
      const id = this.classIdGen.generate();
      cls.setId(id);
      this.classes.set(id, cls);
    } else {
      this.classes.set(classId, cls);
    }
  }
}

