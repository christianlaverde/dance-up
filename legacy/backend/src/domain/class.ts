import { DateTime } from "luxon";
import { RecurrencePatternOptions, RecurrencePattern, isRecurrencePattern } from "./recurrencePattern.js";

export enum DAY_OF_WEEK {
  // ISO8601 Standard
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
  SUNDAY = 7
}

export function isDayOfWeek(value: any): value is DAY_OF_WEEK {
  return Object.values(DAY_OF_WEEK).includes(value);
}

export interface ClassOptions {
  id: string | undefined;
  name: string;
  startTime: DateTime;
  endTime: DateTime;
  day: DAY_OF_WEEK;
  description?: string;
  genre?: string;
  recurrence?: RecurrencePatternOptions;
}

export class Class {
  private id: string | undefined;
  private name: string;
  private description: string;
  private genre: string;
  private startTime: DateTime;
  private endTime: DateTime;
  private day: DAY_OF_WEEK;
  private recurrence?: RecurrencePattern;

  constructor(options: ClassOptions) {
    if (typeof options.name !== 'string' || options.name.trim() === '') {
      throw new Error('Invalid Class name: must be a non-empty string');
    }
    this.name = options.name;

    if (options.id !== undefined && (typeof options.id !== 'string' || options.id.trim() === '')) {
      throw new Error('Invalid Class id: must be a non-empty string or undefined');
    }
    this.id = options.id;

    if (options.description !== undefined && typeof options.description !== 'string') {
      throw new Error('Invalid Class description: must be a string');
    }
    this.description = options.description !== undefined ? options.description : '';

    if (options.genre !== undefined && typeof options.genre !== 'string') {
      throw new Error('Invalid Class genre: must be a string');
    }
    this.genre = options.genre !== undefined ? options.genre : '';

    if (!options.startTime.isValid) {
      throw new Error('Invalid startTime: startTime must be a valid luxon.DateTime');
    }
    if (!options.endTime.isValid) {
      throw new Error('Invalid endTime: endTime must be a valid luxon.DateTime');
    }
    if (options.endTime < options.startTime) {
      throw new Error('Invalid opts: endTime must be greater than startTime');
    }
    this.startTime = options.startTime;
    this.endTime = options.endTime;

    if (!isDayOfWeek(options.day)) {
      throw new Error('Invalid day: day must be a valid DAY_OF_WEEK');
    }
    this.day = options.day;

    if (options.recurrence) {
      this.recurrence = isRecurrencePattern(options.recurrence) ?
        options.recurrence : new RecurrencePattern(options.recurrence);
    }
  }

  getId(): string | undefined {
    return this.id;
  }

  setId(id: string) {
    this.id = id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }
  
  setDescription(description: string): void {
    this.description = description;
  }

  getGenre(): string {
    return this.genre;
  }

  getStartTime(): DateTime {
    return this.startTime;
  }

  getEndTime(): DateTime {
    return this.endTime;
  }

  getRecurrencePattern(): RecurrencePattern | undefined {
    return this.recurrence;
  }
}
