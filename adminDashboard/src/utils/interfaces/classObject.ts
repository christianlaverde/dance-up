import { TimeSlotVO } from "../../../../backend/src/domain/timeSlot.ts"
import { RecurrencePatternOptions } from "../../../../backend/src/domain/recurrencePattern.ts"

export interface ClassStructure {
  id: string
  name: string
  timeSlot: TimeSlotVO;
  description?: string
  genre?: string
  recurrence?: RecurrencePatternOptions
}

