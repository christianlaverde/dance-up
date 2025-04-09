import { DAY_OF_WEEK } from "../domain/class.js";

export interface CreateClassDto {
  id: string;
  name: string;
  description: string;
  day: DAY_OF_WEEK;
}