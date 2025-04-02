import { describe, beforeEach, jest, it, expect } from '@jest/globals';
import { Studio } from '../../src/entities/studio.js';
import { Class } from '../../src/entities/class';

describe('Studio Entity', () => {
  let studio: Studio;

  beforeEach(() => {
    const STUDIO_NAME = 'VB Dance Studio';
    studio = new Studio(STUDIO_NAME);
  })

  it('should add a class', async () => {
    // Arrange 
    const cls = new Class('Salsa Class', 'A fun salsa class');

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

    studio.addClass(class1);
    studio.addClass(class2);

    // Act
    const classes = studio.getClasses();

    // Assert
    expect(classes).toEqual(mockClasses);
  });
})