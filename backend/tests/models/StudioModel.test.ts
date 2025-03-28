import { describe, beforeEach, jest, it, expect } from '@jest/globals';
//import { StudioModel } from '../../src/models/StudioModel.js';
import { QueryConfig } from 'pg';
import { Studio } from '../../src/models/Studio.entity.js';

describe('Studio Model', () => {
  // Clear mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllMembers', () => {
    it('should return an array of all members associated with this studio', async () => {
      // Arrange: Set up mock data
      

      // Act: Call function under test
      const result = await studio.getAllMembers();
    })
  });
});
