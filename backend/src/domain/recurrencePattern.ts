import { DateTime } from "luxon";
import { RECURRENCE_FREQUENCY, isRecurrenceFrequency} from "./class.js";

// Type Guard
export function isRecurrencePatternVO(value: any): value is RecurrencePatternVO {
  return value instanceof RecurrencePatternVO;
}

export interface RecurrencePatternOptions {
  startDate: string | DateTime;
  endDate?: string | DateTime;
  frequency: string | RECURRENCE_FREQUENCY;
}

/**
 * Value Object: RecurrencePattern
 * Self-validating immutable object for recurrence patterns
 */
export class RecurrencePatternVO {
  readonly startDate: DateTime;
  readonly endDate?: DateTime;
  readonly frequency: RECURRENCE_FREQUENCY;

  constructor(props: RecurrencePatternOptions) {
    // Validation
    if (typeof props.startDate === 'string') {
      props.startDate = DateTime.fromISO(props.startDate);
    }
    if (!(props.startDate instanceof DateTime) || !props.startDate.isValid) {
      throw new Error('Invalid RecurrencePattern: startDate must be a valid DateTime or ISO string');
    }

    if (props.endDate !== undefined) {
      if (typeof props.endDate === 'string') {
        props.endDate = DateTime.fromISO(props.endDate);
      }
      if (!(props.endDate instanceof DateTime) || !props.endDate.isValid) {
        throw new Error('Invalid RecurrencePattern: endDate must be a valid DateTime or ISO string if provided');
      }
    }

    if (props.endDate && props.startDate > props.endDate) {
      throw new Error('Invalid RecurrencePattern: endDate must be after startDate');
    }

    if (!isRecurrenceFrequency(props.frequency)) {
      throw new Error('Invalid RecurrencePattern: frequency must be a valid RECURRENCE_FREQUENCY');
    }

    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.frequency = props.frequency;

    // Make object immutable
    Object.freeze(this);
  }

  // Method to create a new instance with updated properties
  withChanges(changes: Partial<{
    startDate: DateTime,
    endDate?: DateTime,
    frequency: RECURRENCE_FREQUENCY
  }>): RecurrencePatternVO {
    return new RecurrencePatternVO({
      startDate: changes.startDate ?? this.startDate,
      endDate: changes.endDate ?? this.endDate,
      frequency: changes.frequency ?? this.frequency
    });
  }

  // Method to remove end date
  withoutEndDate(): RecurrencePatternVO {
    return new RecurrencePatternVO({
      startDate: this.startDate,
      frequency: this.frequency
      // endDate intentionally omitted
    });
  }
}