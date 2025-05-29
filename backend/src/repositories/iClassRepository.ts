import { Class } from "../domain/class.js"

export interface IClassRepository {
  findAll(): Promise<Class[]>;
  findById(classId: string): Promise<Class | null>;
  // findByStudioId(studioId: string): Promise<Class[]>;
  save(cls: Class): Promise<void>;
}
