import { describe, beforeEach, jest, it, expect } from '@jest/globals';
import { StudioController } from '../../src/controllers/studioController.js';
import { StudioService } from '../../src/services/studioService.js';
import { Studio } from '../../src/domain/studio';
import { Class, ClassOptions } from '../../src/domain/class.js';
import { CreateStudioDto } from '../../src/dto/CreateStudioDto.js';
import { CreateClassDto } from '../../src/dto/CreateClassDto.js';
import { DAY_OF_WEEK } from '../../src/domain/class.js';

describe('Studio Controller', () => {
  let studioController: StudioController;
  let studioServiceMock: jest.Mocked<StudioService>;

  beforeEach(() => {
    studioServiceMock = {
      getAllStudios: jest.fn(),
      getStudioById: jest.fn(),
      createStudio: jest.fn(),
      createStudioClass: jest.fn()
    } as unknown as jest.Mocked<StudioService>;

    studioController = new StudioController(studioServiceMock);
  });

  describe('Happy Paths', () => {
    it('should return all studios with a 200', async () => {
      // Arrange
      const studio1 = new Studio({
        id: 'studio-1', 
        ownerId: 'owner-1', 
        name: 'VG Dance Studio', 
        address: '123 Main St.'
      });
      const studio2 = new Studio({
        id: 'studio-2', 
        ownerId: 'owner-2', 
        name: 'YA Dance Studio', 
        address: '456 Dreary Ln.'
      });
      // Mock StudioService.getAllStudios
      studioServiceMock.getAllStudios.mockResolvedValue([studio1, studio2]);
      // Mock req/res objs
      const req = {} as any;
      const res = {
        // simulates res.status(HTTP_CODE).json(DATA)
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as any;
      const expectedJson = {
        data: [studio1, studio2],
        totalCount: 2,
        status: 'success'
      };
  
      // Act
      await studioController.getAllStudiosWithClasses(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expectedJson);
    });
  
    it('should return a studio by id with a 200', async () => {
      // Arrange
      const studio = new Studio({
        id: 'studio-1', 
        ownerId: 'owner-1', 
        name: 'VG Dance Studio', 
        address: '123 Main St.'
      });
      // Mock StudioService.getStudioById
      studioServiceMock.getStudioById.mockResolvedValue(studio);
      // Mock req/res objs
      const req = {
        params: {
          id: studio.getId()
        }
      } as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as any;
      const expectedJson = {
        studio: studio,
        status: 'success'
      };
  
      // Act
      await studioController.getStudioWithClassesById(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expectedJson);
    });
  
    it('should return newly created studio data with a 201', async () => {
      // Arrange
      // Create new CreateStudioDto
      const studioDto: CreateStudioDto = { ownerId: 'owner-1', name: 'VG Dance Studio', address: '123 Main St.' };
      // Mock req/res objs
      const req = {
        body: studioDto
      } as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as any;
      // Create expectedStudio and mock studioService.createStudio return value
      const expectedStudio = new Studio({
        id: 'studio-1', 
        ownerId: studioDto.ownerId, 
        name: studioDto.name, 
        address: studioDto.address
      });
      studioServiceMock.createStudio.mockResolvedValue(expectedStudio);
      // Create expectedJson
      const expectedJson = {
        status: 'success',
        studio: expectedStudio
      };
  
      // Act
      await studioController.createStudio(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expectedJson);
    });
  
    it('should return newly created class data with a 201', async () => {
      // Arrange
      // Set up studio and StudioService.getStudioById
      const studio = new Studio({
        id: 'studio-1', 
        ownerId: 'owner-1', 
        name: 'VG Dance Studio', 
        address: '123 Main St.'
      });
      studioServiceMock.getStudioById.mockResolvedValue(studio);
      // Create new CreateClassDto and expected Class obj
      const classOpts: ClassOptions = { 
        id: 'class-1', 
        name: 'Beginner Salsa', 
        description: 'A good time', 
        timeSlot: {
          day: DAY_OF_WEEK.WEDNESDAY,
          startHour: 18,
          startMinute: 15,
          durationMinutes: 30
        },
        recurrence: {
          startDate: '2025-04-01',
          endDate: '2025-06-01',
          frequency: 'weekly'
        }
      };
      const expectedClass = new Class(classOpts);
      // Mock StudioService.createStudioClass
      studioServiceMock.createStudioClass.mockResolvedValue(expectedClass);
      // Mock req/res objs
      const req = {
        params: { id: studio.getId() },
        body: classOpts
      } as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as any;
      // Create expectedJson
      const expectedJson = {
        status: 'success',
        data: {
          studioId: studio.getId(),
          class: expectedClass,
        }
      };
  
      // Act
      await studioController.createStudioClass(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expectedJson);
    });
  });

  describe('Sad Paths', () => {

  });
});