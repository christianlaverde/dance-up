import { describe, beforeEach, jest, it, expect } from '@jest/globals';
import { StudioModel } from '../../src/models/studioModel.js';
import { QueryConfig } from 'pg';
import { Studio } from '../../src/entities/studio.js';
import { expectStudioShape, createMockQuery } from '../helperFunctions.js';

describe('Studio Model', () => {
  // Initialize Mock Data
  let studioModel: StudioModel;
  let getCapturedQuery: () => QueryConfig | undefined;
});