import { describe, beforeEach, jest, it, expect } from '@jest/globals';
import { StudioController } from '../../src/controllers/studioController.js';
import { StudioService } from '../../src/services/studioService.js';
import { Studio } from '../../src/domain/studio';
import { Class } from '../../src/domain/class.js';
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

    it('should return all studios with a 200', async () => {
      // Arrange
      const studio1 = new Studio('studio-1', 'owner-1', 'VG Dance Studio', '123 Main St.');
      const studio2 = new Studio('studio-2', 'owner-2', 'YA Dance Studio', '456 Dreary Ln.');
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
      const studio = new Studio('studio-1', 'owner-1', 'VG Dance Studio', '123 Main St.');
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
      const expectedStudio = new Studio('studio-1', studioDto.ownerId, studioDto.name, studioDto.address);
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
      const studio = new Studio('studio-1', 'owner-1', 'VG Dance Studio', '123 Main St.');
      studioServiceMock.getStudioById.mockResolvedValue(studio);
      // Create new CreateClassDto and expected Class obj
      const classDto: CreateClassDto = { id: 'class-1', name: 'Beginner Salsa', description: 'A good time', day: DAY_OF_WEEK.WEDNESDAY };
      const expectedClass = new Class(classDto.id, classDto.name, classDto.description, classDto.day);
      // Mock StudioService.createStudioClass
      studioServiceMock.createStudioClass.mockResolvedValue(expectedClass);
      // Mock req/res objs
      const req = {
        body: {
          studioId: studio.getId(),
          classDto: classDto
        }
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