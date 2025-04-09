import { describe, beforeEach, jest, it, expect } from '@jest/globals';
import { Studio } from '../../src/domain/studio.js';
import { Class, DAY_OF_WEEK} from '../../src/domain/class.js';

describe('Studio Entity', () => {
  it('should add a class', async () => {
    // Arrange 
    const cls = new Class('class-1', 'Salsa Class', 'A fun salsa class', DAY_OF_WEEK.MONDAY);
    const studio = new Studio('studio-1', '1', 'VB Dance Studio', '123 Main St.');

    // Act
    studio.addClass(cls);

    // Assert
    const classes = studio.getClasses();
    expect(classes).toContain(cls);
  });

  it('should return a collection of classes', async () => {
    // Arrange
    const cls1 = new Class('class-1', 'Salsa Class', 'A fun salsa class');
    const cls2 = new Class('class-2', 'Jazz Class', 'A fun jazz class', DAY_OF_WEEK.WEDNESDAY);
    const mockClasses: Class[] = [cls1, cls2];
    const studio = new Studio('1', '1', 'VB Dance Studio', '123 Main St.');

    studio.addClass(cls1);
    studio.addClass(cls2);

    // Act
    const classes = studio.getClasses();

    // Assert
    expect(classes).toEqual(mockClasses);
  });
})