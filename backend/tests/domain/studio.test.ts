import { describe, beforeEach, jest, it, expect } from '@jest/globals';
import { Studio } from '../../src/domain/studio.js';
import { Class, DAY_OF_WEEK} from '../../src/domain/class.js';

describe('Studio Entity', () => {
  describe('Happy Paths', () => {
    it('should create a valid studio', () => {
      // Arrange
      const studioOpts = {
        id: 'class-1',
        ownerId: 'owner-1',
        name: 'VG Dance Studio',
        address: '123 Main St.'
      };

      // Act
      const studio = new Studio(studioOpts);

      // Arrange
      expect(studio).toBeInstanceOf(Studio);
    });

    it('should add a class', async () => {
      // Arrange 
      const cls = new Class({
        id: 'class-1',
        name: 'Salsa Class',
        timeSlot: {
          day: DAY_OF_WEEK.MONDAY,
          startHour: 20,
          startMinute: 30,
          durationMinutes: 90
        }
      });
      const studio = new Studio({
        id: 'studio-1', 
        ownerId: '1', 
        name: 'VB Dance Studio', 
        address: '123 Main St.'
      });
      
      // Act
      studio.addClass(cls);
  
      // Assert
      const classes = studio.getClasses();
      expect(classes).toContain(cls);
    });
  
    it('should return a collection of classes', async () => {
      // Arrange
      const cls1 = new Class({
        id: 'class-1', 
        name: 'Salsa Class', 
        timeSlot: {
          day: DAY_OF_WEEK.MONDAY,
          startHour: 20,
          startMinute: 30,
          durationMinutes: 90
        },
        description: 'A fun salsa class'
      });
      const cls2 = new Class({
        id: 'class-2', 
        name: 'Jazz Class',
        timeSlot: {
          day: DAY_OF_WEEK.WEDNESDAY,
          startHour: 20,
          startMinute: 30,
          durationMinutes: 90        
        },
        description: 'A fun jazz class'
      });
      const mockClasses: Class[] = [cls1, cls2];
      const studio = new Studio({
        id: 'studio-1', 
        ownerId: '1', 
        name: 'VB Dance Studio', 
        address: '123 Main St.'
      });
  
      studio.addClass(cls1);
      studio.addClass(cls2);
  
      // Act
      const classes = studio.getClasses();
      
      // Assert
      expect(classes).toEqual(mockClasses);
    });
  });
});