import { Class } from "domain/class.js"

export interface IClassRepository {
  getAllClasses(): Promise<Class[]>;
  getClassesByStudioId(studioId: string): Promise<Class[]>;
  getClassById(classId: string): Promise<Class | null>;
  saveClass(cls: Class): Promise<void>;
}