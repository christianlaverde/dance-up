import { describe, beforeEach, jest, it, expect } from '@jest/globals';
import { Class, ClassOptions, DAY_OF_WEEK, RECURRENCE_FREQUENCY} from '../../src/domain/class.js';
import { DateTime } from 'luxon';

describe('Class Entity', () => {
  it('should create a new class object without optional params', () => {
    // Arrange
    const classOpts: ClassOptions = {
      id: 'class-1',
      name: 'Beginner Salsa',
      timeSlot: {
        day: DAY_OF_WEEK.MONDAY,
        startHour: 18,
        startMinute: 0,
        durationMinutes: 60
      }
    }

    // Act
    const expectedClass = new Class(classOpts);

    // Assert
    expect(expectedClass).toBeInstanceOf(Class);
  });

  it('should create a new class object with optional params', () => {
    // Arrange
    const classOpts1: ClassOptions = {
      id: 'class-1',
      name: 'Beginner Salsa',
      timeSlot: {
        day: DAY_OF_WEEK.MONDAY,
        startHour: 18,
        startMinute: 0,
        durationMinutes: 60
      },
      description: 'A good time.'
    }
    const classOpts2: ClassOptions = {
      id: 'class-2',
      name: 'Intermediate Salsa',
      timeSlot: {
        day: DAY_OF_WEEK.MONDAY,
        startHour: 19,
        startMinute: 0,
        durationMinutes: 60
      },
      recurrence: {
        startDate: DateTime.utc(2025, 3, 1),
        endDate: DateTime.utc(2025, 4, 1),
        frequency: RECURRENCE_FREQUENCY.WEEKLY
      }
    }
    // Act
    const c1 = new Class(classOpts1);
    const c2 = new Class(classOpts2);

    // Assert
    expect(c1).toBeInstanceOf(Class);
    expect(c2).toBeInstanceOf(Class);
  });

  
})