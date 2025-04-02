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
          new Class('1', '2', 'Salsa Class', 'A fun salsa class'), 
          new Class('3', '4', 'Jazz Class', 'A fun jazz class'),
        ];
        const { query, getCapturedQuery } = createMockQuery(mockData);
        classModel = new ClassModel({ query });

        // Act
        const result = await classModel.getAllClasses();
        capturedQuery = getCapturedQuery();

        // Assert
        expect(result).toEqual(mockData);
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
