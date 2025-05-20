import { StudioService } from "../services/studioService.js";
import { DAY_OF_WEEK, RECURRENCE_FREQUENCY } from "../domain/class.js";
import { DateTime } from "luxon";

export async function setupInMemoryDb(service: StudioService): Promise<void> {
  const s1 = await service.createStudio({
    ownerId: 'owner-0',
    name: 'VG Dance Studio',
    address: { addr1: '123 Main St.', city: 'Houston', state: 'TX', zip: '12345' }
  });
  const s2 = await service.createStudio({
    ownerId: 'owner-1',
    name: 'YA Dance Studio',
    address: { addr1: '456 Dreary Ln.', city: 'Manhattan', state: 'NY', zip: '54321' }
  });
  
  const studio1Id = s1.getId();
  if (studio1Id !== undefined) {
    service.createStudioClass(studio1Id, {
      name: 'Beginner Salsa',
      genre: 'Salsa',
      description: 'A good time',
      timeSlot: {
        day: DAY_OF_WEEK.MONDAY,
        startHour: 18,
        startMinute: 0,
        durationMinutes: 60,
      },
      recurrence: {
        startDate: DateTime.utc(2025, 3, 1),
        endDate: DateTime.utc(2025, 4, 1),
        frequency: RECURRENCE_FREQUENCY.WEEKLY
      }
    });
      service.createStudioClass(studio1Id, {
      name: 'Advanced Salsa',
      description: 'A long time',
      genre: 'Salsa',
      timeSlot: {
        day: DAY_OF_WEEK.MONDAY,
        startHour: 19,
        startMinute: 0,
        durationMinutes: 60,
      },
      recurrence: {
        startDate: DateTime.utc(2025, 3, 1),
        endDate: DateTime.utc(2025, 4, 1),
        frequency: RECURRENCE_FREQUENCY.WEEKLY
      }
    });
  }
  

  const studio2Id = s2.getId();
  if (studio2Id !== undefined) {
    service.createStudioClass(studio2Id, {
      name: 'Jazz Class',
      description: 'A jazzy time',
      timeSlot: {
        day: DAY_OF_WEEK.WEDNESDAY,
        startHour: 19,
        startMinute: 30,
        durationMinutes: 60,
      },
      recurrence: {
        startDate: DateTime.utc(2025, 3, 1),
        endDate: DateTime.utc(2025, 4, 1),
        frequency: RECURRENCE_FREQUENCY.WEEKLY
      }
    });
    
    service.createStudioClass(studio2Id, {
      name: 'Intermediate Ballet',
      description: 'A ballet-y time',
      timeSlot: {
        day: DAY_OF_WEEK.WEDNESDAY,
        startHour: 20,
        startMinute: 30,
        durationMinutes: 60,
      },
      recurrence: {
        startDate: DateTime.utc(2025, 3, 1),
        endDate: DateTime.utc(2025, 4, 1),
        frequency: RECURRENCE_FREQUENCY.WEEKLY
      }
    });
  }
}
