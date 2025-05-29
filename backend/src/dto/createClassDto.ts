import { DateTime } from "luxon";
import { RecurrencePatternOptions } from "../domain/recurrencePattern.js";
import { DAY_OF_WEEK } from "../domain/class.js";

export interface CreateClassDto {
  name: string;
  startTime: DateTime;
  endTime: DateTime;
  day: DAY_OF_WEEK;
  description?: string;
  genre?: string;
  recurrence?: RecurrencePatternOptions;
}
