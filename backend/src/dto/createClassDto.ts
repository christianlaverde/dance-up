import { DAY_OF_WEEK } from "../domain/class.js";

export interface CreateClassDto {
  id: string;
  name: string;
  description: string;
  genre: string;
  day: DAY_OF_WEEK;
}