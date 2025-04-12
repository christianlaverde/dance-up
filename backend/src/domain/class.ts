import { DateTime, Duration } from "luxon";

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

/**
 * Value Object: TimeSlot
 * Self-validating immutable object for time slot representation
 */
export class TimeSlotVO {
  readonly day: DAY_OF_WEEK;
  readonly startHour: number;
  readonly startMinute: number;
  readonly durationMinutes: number;

  constructor(props: {
    day: DAY_OF_WEEK,
    startHour: number,
    startMinute: number,
    durationMinutes: number
  }) {
    // Validation
    if (!isDayOfWeek(props.day)) {
      throw new Error('Invalid TimeSlot: day must be a valid DAY_OF_WEEK');
    }

    if (typeof props.startHour !== 'number' || props.startHour < 0 || props.startHour > 23) {
      throw new Error('Invalid TimeSlot: startHour must be between 0 and 23');
    }

    if (typeof props.startMinute !== 'number' || props.startMinute < 0 || props.startMinute > 59) {
      throw new Error('Invalid TimeSlot: startMinute must be between 0 and 59');
    }

    if (typeof props.durationMinutes !== 'number' || props.durationMinutes <= 0) {
      throw new Error('Invalid TimeSlot: durationMinutes must be a positive number');
    }

    this.day = props.day;
    this.startHour = props.startHour;
    this.startMinute = props.startMinute;
    this.durationMinutes = props.durationMinutes;

    // Make object immutable
    Object.freeze(this);
  }

  // Utility methods
  getStartTime(): string {
    return `${this.startHour.toString().padStart(2, '0')}:${this.startMinute.toString().padStart(2, '0')}`;
  }

  getEndTime(): string {
    const endMinutes = this.startHour * 60 + this.startMinute + this.durationMinutes;
    const endHour = Math.floor(endMinutes / 60) % 24;
    const endMinute = endMinutes % 60;
    
    return `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
  }

  getDuration(): Duration {
    return Duration.fromObject({ minutes: this.durationMinutes });
  }

  // Create a new TimeSlotVO with updated values
  withChanges(changes: Partial<{
    day: DAY_OF_WEEK,
    startHour: number,
    startMinute: number,
    durationMinutes: number
  }>): TimeSlotVO {
    return new TimeSlotVO({
      day: changes.day ?? this.day,
      startHour: changes.startHour ?? this.startHour,
      startMinute: changes.startMinute ?? this.startMinute,
      durationMinutes: changes.durationMinutes ?? this.durationMinutes
    });
  }
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

// Type Guard for Value Objects
export function isTimeSlotVO(value: any): value is TimeSlotVO {
  return value instanceof TimeSlotVO;
}

export function isRecurrencePatternVO(value: any): value is RecurrencePatternVO {
  return value instanceof RecurrencePatternVO;
}

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
  recurrence?: RecurrencePatternVO | {
    startDate: DateTime,
    endDate?: DateTime,
    frequency: RECURRENCE_FREQUENCY
  };
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