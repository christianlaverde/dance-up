import { StudioService } from "../services/studioService.js";
import { DAY_OF_WEEK, RECURRENCE_FREQUENCY } from "../domain/class.js";
import { DateTime } from "luxon";

export async function setupInMemoryDb(service: StudioService): Promise<void> {
  const s1 = await service.createStudio({
    ownerId: 'owner-0',
    name: 'VG Dance Studio',
    address: { addr1: '123 Main St.' }
  });
  const s2 = await service.createStudio({
    ownerId: 'owner-2',
    name: 'YA Dance Studio',
    address: { addr1: '456 Dreary Ln.' }
  });
  
  service.createStudioClass(s1.getId(), {
    id: 'class-1',
    name: 'Beginner Salsa',
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
  
  service.createStudioClass(s1.getId(), {
    id: 'class-2',
    name: 'Advanced Salsa',
    description: 'A long time',
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
  
  service.createStudioClass(s2.getId(), {
    id: 'class-3',
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
  
  service.createStudioClass(s2.getId(), {
    id: 'class-4',
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

