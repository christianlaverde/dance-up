import { describe, beforeEach, jest, it, expect } from '@jest/globals';
import { Studio } from '../../src/domain/studio.js';
import { Class } from '../../src/domain/class';
import { IStudioRepository } from '../../src/repositories/IStudioRepository.js';
import { IClassRepository } from '../../src/repositories/IClassRepository.js';
import { StudioService } from '../../src/services/studioService.js';

describe('Studio Service', () => {
  let studioRepositoryMock: jest.Mocked<IStudioRepository>;
  let classRepositoryMock: jest.Mocked<IClassRepository>;

  beforeEach(() => {
    studioRepositoryMock = {
      getAllStudios: jest.fn(),
      getStudioById: jest.fn(),
      saveStudio: jest.fn()
    }
    classRepositoryMock = {
      getAllClasses: jest.fn(),
      getClassesByStudioId: jest.fn(),
      getClassById: jest.fn(),
      saveClass: jest.fn()
    }
  });

  it('should return a collection of all studios with classes', async () => {
    // Arrange
    // Create sample studios
    const studio1 = new Studio('1', '1', 'VB Dance Studio', '123 Main St.');
    const studio2 = new Studio('2', '2', 'YA Dance Studio', '456 Dreary Ln.');
    // Mock StudioRepository to return sample studios
    studioRepositoryMock.getAllStudios.mockResolvedValue([studio1, studio2]);
    // Create sample classes
    const class1 = new Class('1', '1', 'Beginner Salsa', 'A good time');
    const class2 = new Class('2', '1', 'Advanced Salsa', 'A long time');
    const class3 = new Class('3', '2', 'Jazz Class', 'A fun time');
    const class4 = new Class('4', '2', 'Ballet Class', 'A swell time');
    // Mock ClassRepository to return classes based on studio id
    classRepositoryMock.getClassesByStudioId.mockImplementation(async (studioId: string) => {
      if (studioId === '1') return [class1, class2];
      if (studioId === '2') return [class3, class4];
      return [];
    });
    // Create StudioService
    const studioService = new StudioService(studioRepositoryMock, classRepositoryMock);

    // Set up mock return value
    studio1.addClass(class1);
    studio1.addClass(class2);
    studio2.addClass(class3);
    studio2.addClass(class4);
    const expectedStudios = [studio1, studio2];

    // Act
    const studios = await studioService.getAllStudiosWithClasses();

    // Assert
    expect(studios).toEqual(expectedStudios);
  });

  it('should return a studio with classes', async () => {
    // Arrange
    // Create sample studio
    const expectedStudio = new Studio('1', '1', 'VB Dance Studio', '123 Main St.');
    // Mock StudioRepository to return sample studio
    studioRepositoryMock.getStudioById.mockImplementation(async (studioId: string) => {
      if (studioId === '1') return expectedStudio;
      return null;
    });
    // Create sample classes
    const class1 = new Class('1', '1', 'Beginner Salsa', 'A good time');
    const class2 = new Class('2', '1', 'Advanced Salsa', 'A long time');
    // Mock ClassRepository to return sample classes
    classRepositoryMock.getClassesByStudioId.mockImplementation(async (studioId: string) => {
      if (studioId === '1') return [class1, class2];
      return [];
    });
    // Create StudioService
    const studioService = new StudioService(studioRepositoryMock, classRepositoryMock);
    // Set up expected studio
    expectedStudio.addClass(class1);
    expectedStudio.addClass(class2);

    // Act
    const studio = await studioService.getStudioWithClassesById('1');

    // Assert
    expect(studio).toEqual(expectedStudio)
  });
})