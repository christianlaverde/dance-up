import { describe, beforeEach, jest, it, expect } from '@jest/globals';
import { ClassModel } from '../../src/models/classModel.js';
import { QueryConfig } from 'pg';
import { Class } from '../../src/entities/class.js';
import { expectClassShape, createMockQuery } from '../helperFunctions.js';

describe('Class Model', () => {
  // Initialize Mock Data
  let classModel: ClassModel;
  let capturedQuery: QueryConfig | undefined;

  // Clear mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllClasses', () => {
    describe('Happy Paths', () =>{
      it('should return an array of classes', async () => {
        // Arrange
        const mockData: Class[] = [
          {id: '1', studio_id: '2', class_name: 'Salsa Class', class_description: 'A fun salsa class'},
          {id: '3', studio_id: '4', class_name: 'Jazz Class', class_description: 'A fun jazz class'}
        ];
        const { query, getCapturedQuery } = createMockQuery(mockData);
        classModel = new ClassModel({ query });

        // Act
        const result = await classModel.getAllClasses();
        capturedQuery = getCapturedQuery();

        // Assert
        expect(result).toEqual(mockData);
        expect(capturedQuery).toBeDefined();
        result.forEach(expectClassShape);
        expect(capturedQuery!.text).toMatch(/SELECT id, studio_id, class_name, class_description/);
      });
    });

    describe('Sad Paths', () => {
      it('should return an empty array if no classes found', async () => {
        // Arrange
        const mockData: Class[] = [];
        const { query, getCapturedQuery } = createMockQuery(mockData);
        classModel = new ClassModel({ query });

        // Act
        const result = await classModel.getAllClasses();
        capturedQuery = getCapturedQuery();

        // Assert
        expect(result).toEqual([]);
        expect(capturedQuery).toBeDefined();
      });

      it('should propagate an error when db.query fails and throws an exception', async () => {
        // Arrange: Set Up Mock Data
        const mockQuery = async () => {
          throw new Error('Database Error');
        }
        classModel = new ClassModel({ query: mockQuery });

        // Act & Assert
        await expect(classModel.getAllClasses()).rejects.toThrow('Database Error');
      });
    });

  });
});
