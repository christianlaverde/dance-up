// import { DAY_OF_WEEK } from "../../../../backend/src/domain/timeSlot.js"
// import { RecurrencePattern } from "../../../../backend/src/domain/recurrencePattern.js"
import { DateTime } from "luxon";

export interface ClassStructure {
  id: string;
  studioId: string;
  instructorId: string;
  name: string;
  day: number | null;
  startTime: DateTime | null;
  endTime: DateTime | null;
  description?: string
  genre?: string
  capacity?: number;
}

