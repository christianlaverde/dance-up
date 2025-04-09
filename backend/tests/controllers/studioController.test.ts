import { describe, beforeEach, jest, it, expect } from '@jest/globals';
import { StudioController } from '../../src/controllers/studioController.js';
import { StudioService } from '../../src/services/studioService.js';
import { Studio } from '../../src/domain/studio';

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
      const req = {} as any;
      const res = {
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
});