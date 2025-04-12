import { DateTime } from "luxon";
import { RECURRENCE_FREQUENCY } from "./class.js";
import { isRecurrenceFrequency } from "./class.js";

// Type Guard
export function isRecurrencePatternVO(value: any): value is RecurrencePatternVO {
  return value instanceof RecurrencePatternVO;
}

/**
 * Value Object: RecurrencePattern
 * Self-validating immutable object for recurrence patterns
 */
export class RecurrencePatternVO {
  readonly startDate: DateTime;
  readonly endDate?: DateTime;
  readonly frequency: RECURRENCE_FREQUENCY;

  constructor(props: {
    startDate: DateTime,
    endDate?: DateTime,
    frequency: RECURRENCE_FREQUENCY
  }) {
    // Validation
    if (!(props.startDate instanceof DateTime) || !props.startDate.isValid) {
      throw new Error('Invalid RecurrencePattern: startDate must be a valid DateTime');
    }

    if (props.endDate !== undefined && 
        (!(props.endDate instanceof DateTime) || !props.endDate.isValid)) {
      throw new Error('Invalid RecurrencePattern: endDate must be a valid DateTime if provided');
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