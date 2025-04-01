import { describe, beforeEach, jest, it, expect } from '@jest/globals';
import { StudioModel } from '../../src/models/studioModel.js';
import { QueryConfig } from 'pg';
import { Studio } from '../../src/entities/studio.js';
import { User, UserRole } from '../../src/entities/user.js';
import { expectStudioShape, expectUserShape, createMockQuery } from '../helperFunctions.js';

describe('Studio Model', () => {
  // Initialize Mock Data
  let studioModel: StudioModel;

  // Clear mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllStudios', () => {
    describe('Happy Paths', () => {
      it('should return an array of studios', async () => {
        // Arrange
        const mockData: Studio[] = [
          {id: '1', owner_id: '2', studio_name: 'All Stars', address: '123 Main Street'},
          {id: '3', owner_id: '4', studio_name: 'None Stars', address: '456 Dreary Lane'}
        ];
        const { query, getCapturedQuery } = createMockQuery(mockData);
        studioModel = new StudioModel({ query });

        // Act
        const result = await studioModel.getAllStudios();
        const capturedQuery = getCapturedQuery();

        // Assert
        expect(result).toEqual(mockData);
        expect(capturedQuery).toBeDefined();
        result.forEach(expectStudioShape);
        expect(capturedQuery!.text).toMatch(/SELECT id, owner_id, studio_name, address/);
      });
    });

    describe('Sad Paths', () => {
      it('should return an empty array if no studios found', async () => {
        // Arrange
        const mockData: Studio[] = [];
        const { query, getCapturedQuery } = createMockQuery(mockData);
        studioModel = new StudioModel({ query });

        // Act
        const result = await studioModel.getAllStudios();
        const capturedQuery = getCapturedQuery();

        // Assert
        expect(result).toEqual([]);
        expect(capturedQuery).toBeDefined();
      });

      it('should propagate an error when db.query fails and throws an exception', async () => {
        // Arrange: Set Up Mock Data
        const mockQuery = async () => {
          throw new Error('Database Error');
        }
        studioModel = new StudioModel({ query: mockQuery });

        // Act/Assert: Expect that error is thrown
        await expect(studioModel.getAllStudios()).rejects.toThrow('Database Error');
      });
    });
  });

  describe('getAllStudioMembers', () => {
    describe('Happy Paths', () => {
      it('should return an array of studio members (users)', async () => {
        // Arrange
        const mockData: User[] = [
          {id: '1', email: 'user1@example.com', password_hash: 'hash1', 
            first_name: 'FName1', middle_name: 'MName1', last_name: 'LName1', role: UserRole.OWNER},
          {id: '2', email: 'user2@example.com', password_hash: 'hash2', 
            first_name: 'FName2', middle_name: 'MName2', last_name: 'LName2', role: UserRole.MEMBER},
        ];
        const { query, getCapturedQuery } = createMockQuery(mockData);
        studioModel = new StudioModel({ query });

        // Act
        const result = await studioModel.getAllStudioMembers('1');
        const capturedQuery = getCapturedQuery();

        // Assert
        expect(result).toEqual(mockData);
        expect(capturedQuery).toBeDefined();
        result.forEach(expectUserShape);
       // Verify the SQL query contains a WHERE clause with a parameter placeholder ($1) for studio id
        expect(capturedQuery!.text).toMatch(/WHERE sm.studio_id = \$1/);
      });
    });

    describe('Sad Paths', () => {
      it('should return an empty array if no studios found', async () => {
        // Arrange
        const mockData: Studio[] = [];
        const { query, getCapturedQuery } = createMockQuery(mockData);
        studioModel = new StudioModel({ query });

        // Act
        const result = await studioModel.getAllStudios();
        const capturedQuery = getCapturedQuery();

        // Assert
        expect(result).toEqual([]);
        expect(capturedQuery).toBeDefined();
      });

      it('should propagate an error when db.query fails and throws an exception', async () => {
        // Arrange: Set Up Mock Data
        const mockQuery = async () => {
          throw new Error('Database Error');
        }
        studioModel = new StudioModel({ query: mockQuery });

        // Act/Assert: Expect that error is thrown
        await expect(studioModel.getAllStudios()).rejects.toThrow('Database Error');
      });
    });
  });
});