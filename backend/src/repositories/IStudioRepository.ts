import { Studio } from "domain/studio.js"

export interface IStudioRepository {
  getAllStudios(): Promise<Studio[]>;
  getStudioById(studioId: string): Promise<Studio | null>;
  saveStudio(studio: Studio): Promise<void>;
}