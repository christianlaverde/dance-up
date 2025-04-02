import { describe, beforeEach, jest, it, expect } from '@jest/globals';
import { Studio } from '../../src/domain/studio.js';
import { Class } from '../../src/domain/class.js';

describe('Studio Entity', () => {
  it('should add a class', async () => {
    // Arrange 
    const cls = new Class('Salsa Class', 'A fun salsa class');
    const studio = new Studio('1', '1', 'VB Dance Studio', '123 Main St.');

    // Act
    studio.addClass(cls);

    // Assert
    const classes = studio.getClasses();
    expect(classes).toContain(cls);
  });

  it('should return a collection of classes', async () => {
    // Arrange
    const class1 = new Class('Salsa Class', 'A fun salsa class');
    const class2 = new Class('Jazz Class', 'A fun jazz class');
    const mockClasses: Class[] = [class1, class2];
    const studio = new Studio('1', '1', 'VB Dance Studio', '123 Main St.');

    studio.addClass(class1);
    studio.addClass(class2);

    // Act
    const classes = studio.getClasses();

    // Assert
    expect(classes).toEqual(mockClasses);
  });
})