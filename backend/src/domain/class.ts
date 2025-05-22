import { TimeSlotOptions, TimeSlot, isTimeSlot } from "./timeSlot.js";
import { RecurrencePatternOptions, RecurrencePattern, isRecurrencePattern } from "./recurrencePattern.js";

export interface ClassOptions {
  id: string | undefined;
  name: string;
  timeSlot: TimeSlot | TimeSlotOptions;
  description?: string;
  genre?: string;
  recurrence?: RecurrencePatternOptions;
}

export class Class {
  private id: string | undefined;
  private name: string;
  private description: string;
  private genre: string;
  private timeSlot: TimeSlot;
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

    this.timeSlot = isTimeSlot(options.timeSlot) ? options.timeSlot : new TimeSlot(options.timeSlot);

    if (options.recurrence) {
      this.recurrence = isRecurrencePattern(options.recurrence) ?
        options.recurrence : new RecurrencePattern(options.recurrence);
    }
  }

  // Getters
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

  getTimeSlot(): TimeSlot {
    return this.timeSlot;
  }

  getRecurrencePattern(): RecurrencePattern | undefined {
    return this.recurrence;
  }
}
