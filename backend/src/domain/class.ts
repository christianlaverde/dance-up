import { DateTime } from "luxon";
import { TimeSlotVO, isTimeSlotVO } from "./timeSlot.js";
import { RecurrencePatternOptions, RecurrencePatternVO, isRecurrencePatternVO } from "./recurrencePattern.js";

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

export enum RECURRENCE_FREQUENCY {
  NONE = 'none',
  WEEKLY = 'weekly',
  BIWEEKLY = 'biweekly',
  MONTHLY = 'monthly'
}

// Type Guard for DAY_OF_WEEK
export function isDayOfWeek(value: any): value is DAY_OF_WEEK {
  return Object.values(DAY_OF_WEEK).includes(value);
}

// Type Guard for RECURRENCE_FREQUENCY
export function isRecurrenceFrequency(value: any): value is RECURRENCE_FREQUENCY {
  return Object.values(RECURRENCE_FREQUENCY).includes(value);
}

/**
 * Value Object: ClassName
 * Ensures name is valid and properly formatted
 */
export class ClassName {
  readonly value: string;

  constructor(name: string) {
    if (!name || typeof name !== 'string' || name.trim() === '') {
      throw new Error('Invalid Class name: must be a non-empty string');
    }
    this.value = name.trim();
    Object.freeze(this);
  }

  toString(): string {
    return this.value;
  }
}

// Type Guard for Value Objects
export function isClassName(value: any): value is ClassName {
  return value instanceof ClassName;
}

/**
 * Class Entity and related interfaces
 */
export interface ClassOptions {
  id: string;
  name: string | ClassName;
  timeSlot: TimeSlotVO | {
    day: DAY_OF_WEEK,
    startHour: number,
    startMinute: number,
    durationMinutes: number
  };
  description?: string;
  recurrence?: RecurrencePatternOptions;
}

export class Class {
  private readonly id: string;
  private name: ClassName;
  private description: string;
  private timeSlot: TimeSlotVO;
  private recurrence?: RecurrencePatternVO;

  constructor(options: ClassOptions) {
    // Convert primitive types to Value Objects if needed
    this.name = isClassName(options.name) ? options.name : new ClassName(options.name);

    // Validate primitives
    if (!options.id || typeof options.id !== 'string' || options.id.trim() === '') {
      throw new Error('Invalid Class id: must be a non-empty string');
    }
    this.id = options.id;

    // Validate description type if it's provided
    if (options.description !== undefined && typeof options.description !== 'string') {
      throw new Error('Invalid Class description: must be a string');
    }
    // Set description (optional) with default empty string
    this.description = options.description !== undefined ? options.description : '';

    // Convert TimeSlot to TimeSlotVO if needed
    this.timeSlot = isTimeSlotVO(options.timeSlot) ? options.timeSlot : new TimeSlotVO(options.timeSlot);

    // Convert RecurrencePattern to RecurrencePatternVO if needed
    if (options.recurrence) {
      this.recurrence = isRecurrencePatternVO(options.recurrence) ?
        options.recurrence : new RecurrencePatternVO(options.recurrence);
    }
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name.toString();
  }

  getNameObject(): ClassName {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getTimeSlot(): TimeSlotVO {
    return this.timeSlot;
  }

  getRecurrencePattern(): RecurrencePatternVO | undefined {
    return this.recurrence;
  }

  // Set/Update
  updateDescription(description: string): void {
    if (typeof description !== 'string') {
      throw new Error('Invalid Class description: must be a string');
    }
    this.description = description;
  }

  updateTimeSlot(timeSlot: TimeSlotVO | {
    day: DAY_OF_WEEK,
    startHour: number,
    startMinute: number,
    durationMinutes: number
  }): void {
    this.timeSlot = isTimeSlotVO(timeSlot) ? timeSlot : new TimeSlotVO(timeSlot);
  }
}