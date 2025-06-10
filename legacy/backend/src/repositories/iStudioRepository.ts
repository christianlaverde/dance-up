import { Studio } from "../domain/studio.js"

export interface IStudioRepository {
  findAll(): Promise<Studio[]>;
  findById(studioId: string): Promise<Studio | null>;
  save(studio: Studio): Promise<void>;
}
