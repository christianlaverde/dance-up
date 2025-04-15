import { CreateClassDto } from "../dto/createClassDto.js";
import { Class } from "../domain/class.js"

export interface IClassRepository {
  getAllClasses(): Promise<Class[]>;
  getClassesByStudioId(studioId: string): Promise<Class[]>;
  getClassById(classId: string): Promise<Class | null>;
  createClass(classDto: CreateClassDto): Promise<Class>;
}