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

export function isDayOfWeek(value: any): value is DAY_OF_WEEK {
  return Object.values(DAY_OF_WEEK).includes(value);
}

export function isTimeSlot(value: any): value is TimeSlot {
  return value instanceof TimeSlot;
}

export interface TimeSlotOptions {
  day: DAY_OF_WEEK;
  startTime: DateTime;
  duration: Duration;
}

export class TimeSlot {
  readonly day: DAY_OF_WEEK;
  readonly startTime: DateTime;
  readonly duration: Duration;

  constructor(props: {
    day: DAY_OF_WEEK,
    startTime: DateTime,
    duration: Duration
  }) {
    // Validation
    if (!isDayOfWeek(props.day)) {
      throw new Error('Invalid TimeSlot: day must be a valid DAY_OF_WEEK');
    }

    if (!props.startTime.isValid) {
      throw new Error('Invalid startTime: startTime must be a valid luxon.DateTime');
    }

    if (!props.duration.isValid) {
      throw new Error('Invalid duration: duration must be a valid luxon.Duration');
    }

    this.day = props.day;
    this.startTime = props.startTime;
    this.duration = props.duration;
  }

  getDuration(): Duration {
    return this.duration; 
  }

}


