import { DAY_OF_WEEK, isDayOfWeek } from "./class.js";
import { Duration } from "luxon";

// Type Guard
export function isTimeSlotVO(value: any): value is TimeSlotVO {
  return value instanceof TimeSlotVO;
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


