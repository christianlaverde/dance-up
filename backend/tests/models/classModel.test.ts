import { describe, beforeEach, jest, it, expect } from '@jest/globals';
import { ClassModel } from '../../src/models/classModel.js';
import { QueryConfig } from 'pg';
import { Class } from '../../src/entities/class.js';
import { expectClassShape, createMockQuery } from '../helperFunctions.js';

describe('Class Model', () => {
  // Initialize Mock Data
  let classModel: ClassModel;

  // Clear mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  
});
