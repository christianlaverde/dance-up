import { describe, beforeEach, jest, it, expect } from '@jest/globals';
import { Studio } from '../../src/domain/studio.js';
import { Class } from '../../src/domain/class';
import { DAY_OF_WEEK } from '../../src/domain/class';
import { CreateClassDto } from "../../src/dto/CreateClassDto.js";
import { IStudioRepository } from '../../src/repositories/iStudioRepository.js';
import { StudioService } from '../../src/services/studioService.js';
import { CreateStudioDto } from '../../src/dto/CreateStudioDto.js';
import { IdGenerator } from '../../src/repositories/idGenerator.js';

describe('Studio Service', () => {
  let studioRepositoryMock: jest.Mocked<IStudioRepository>;

  beforeEach(() => {
    studioRepositoryMock = {
      getAllStudios: jest.fn(),
      getStudioById: jest.fn(),
      saveStudio: jest.fn()
    }
  });

  it('should return a collection of all studios', async () => {
    // Arrange
    // Create sample studios
    const studio1 = new Studio('studio-1', 'owner-1', 'VG Dance Studio', '123 Main St.');
    const studio2 = new Studio('studio-2', 'owner-2', 'YA Dance Studio', '456 Dreary Ln.');
    // Create sample classes
    const class1 = new Class('class-1', 'Beginner Salsa', 'A good time', DAY_OF_WEEK.MONDAY);
    const class2 = new Class('class-2', 'Advanced Salsa', 'A long time', DAY_OF_WEEK.WEDNESDAY);
    const class3 = new Class('class-3', 'Jazz Class', 'A fun time', DAY_OF_WEEK.TUESDAY);
    const class4 = new Class('class-4', 'Ballet Class', 'A swell time', DAY_OF_WEEK.THURSDAY);
    // Add classes
    studio1.addClass(class1);
    studio1.addClass(class2);
    studio2.addClass(class3);
    studio2.addClass(class4);
    // Mock StudioRepository to return sample studios
    const expectedStudios = [studio1, studio2];
    studioRepositoryMock.getAllStudios.mockResolvedValue(expectedStudios);
    // Create StudioService
    const studioService = new StudioService(studioRepositoryMock);

    // Act
    const studios = await studioService.getAllStudios();

    // Assert
    expect(studios).toEqual(expectedStudios);
  });

  it('should return a studio by id', async () => {
    // Arrange
    // Create sample studio
    const expectedStudio = new Studio('studio-1', 'owner-1', 'VG Dance Studio', '123 Main St.');
    // Create sample classes
    const class1 = new Class('class-1', 'Beginner Salsa', 'A good time', DAY_OF_WEEK.MONDAY);
    const class2 = new Class('class-2', 'Advanced Salsa', 'A long time', DAY_OF_WEEK.WEDNESDAY);
    // Set up expected studio
    expectedStudio.addClass(class1);
    expectedStudio.addClass(class2);
    // Mock StudioRepository to return sample studio
    studioRepositoryMock.getStudioById.mockImplementation(async (studioId: string) => {
      if (studioId === 'studio-1') return expectedStudio;
      return null;
    });
    // Create StudioService
    const studioService = new StudioService(studioRepositoryMock);

    // Act
    const studio = await studioService.getStudioById('studio-1');

    // Assert
    expect(studio).toEqual(expectedStudio)
  });

  it('should create and add a class to a studio', async () => {
    // Arrange 
    // Create sample studio
    const studio = new Studio('studio-1', 'owner-1', 'VG Dance Studio', '123 Main St.');
    // Mock StudioRepository to return sample studio
    studioRepositoryMock.getStudioById.mockImplementation(async (studioId: string) => {
      if (studioId === 'studio-1') return studio;
      return null;
    });
    // Create new CreateClassDto
    const classToAddDto: CreateClassDto = { id: 'class-1', name: 'Advanced Salsa', description: 'A long time', day: DAY_OF_WEEK.WEDNESDAY };
    // Create StudioService
    const studioService = new StudioService(studioRepositoryMock);

    // Act
    const createdClass = await studioService.createStudioClass(studio.getId(), classToAddDto);

    // Assert
    const classes = studio.getClasses();
    expect(classes).toContain(createdClass);
  });

  it('should create a new studio', async () => {
    // Arrange
    // Create new CreateStudioDto
    const createStudioDto: CreateStudioDto = {
      ownerId: 'owner-1',
      name: 'VG Dance Studio',
      address: '123 Main St.'
    };
    const expectedStudio = new Studio('studio-1', 'owner-1', 'VG Dance Studio', '123 Main St.');
    // Create mock idGen
    const idGen: jest.Mocked<IdGenerator> = {
      generate: jest.fn()
    };
    idGen.generate.mockImplementation((): string => {
      return 'studio-1';
    });
    // Create StudioService
    const studioService = new StudioService(studioRepositoryMock, idGen);

    // Act
    const createdStudio = await studioService.createStudio(createStudioDto);

    // Assert
    expect(createdStudio).toEqual(expectedStudio);
  });
})