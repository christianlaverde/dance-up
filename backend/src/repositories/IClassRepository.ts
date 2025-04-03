import { Class } from "../domain/class.js"

export interface IClassRepository {
  getAllClasses(): Promise<Class[]>;
  getClassById(id: string): Promise<Class | null>;
  saveClass(cls: Class): Promise<void>;
}