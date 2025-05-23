import { TimeSlot } from "../../../../backend/src/domain/timeSlot.js"
import { RecurrencePattern } from "../../../../backend/src/domain/recurrencePattern.js"

export interface ClassStructure {
  id: string
  name: string
  timeSlot: TimeSlot;
  description?: string
  genre?: string
  recurrence?: RecurrencePattern
}

