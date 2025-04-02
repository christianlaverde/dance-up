import { Studio } from "../domain/studio.js"

export interface IStudioRepository {
  getAllStudios(): Promise<Studio[]>;
  getStudioById(id: string): Promise<Studio>;
  saveStudio(studio: Studio): Promise<void>;
}