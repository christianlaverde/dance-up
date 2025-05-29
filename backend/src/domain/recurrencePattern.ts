import { DateTime } from "luxon";

export enum RECURRENCE_FREQUENCY {
  NONE = 'none',
  WEEKLY = 'weekly',
  BIWEEKLY = 'biweekly',
  MONTHLY = 'monthly'
}

export function isRecurrenceFrequency(value: any): value is RECURRENCE_FREQUENCY {
  return Object.values(RECURRENCE_FREQUENCY).includes(value);
}

export function isRecurrencePattern(value: any): value is RecurrencePattern {
  return value instanceof RecurrencePattern;
}

export interface RecurrencePatternOptions {
  startDate: DateTime;
  endDate?: DateTime;
  frequency: RECURRENCE_FREQUENCY;
}

export class RecurrencePattern {
  readonly startDate: DateTime;
  readonly endDate?: DateTime;
  readonly frequency: RECURRENCE_FREQUENCY;

  constructor(options: RecurrencePatternOptions) {
    // Validation
    if (!options.startDate.isValid) {
      throw new Error('Invalid RecurrencePattern: startDate must be a valid luxon.DateTime');
    }
    if (options.endDate !== undefined && !options.endDate.isValid) {
      throw new Error('Invalid RecurrencePattern: endDate must be a valid luxon.DateTime');
    }
    if (options.endDate !== undefined && (options.endDate < options.startDate)) {
      throw new Error('Invalid RecurrencePattern: endDate must be after startDate');
    }
    if (!isRecurrenceFrequency(options.frequency)) {
      throw new Error('Invalid RecurrencePattern: frequency must be a valid RECURRENCE_FREQUENCY');
    }

    this.startDate = options.startDate;
    this.endDate = options.endDate;
    this.frequency = options.frequency;
  }
}

