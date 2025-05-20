import { RecurrencePatternOptions } from "../domain/recurrencePattern.js";
import { TimeSlotOptions } from "../domain/timeSlot.js";

export interface CreateClassDto {
  name: string;
  timeSlot: TimeSlotOptions,
  description?: string;
  genre?: string;
  recurrence?: RecurrencePatternOptions;
}
