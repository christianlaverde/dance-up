import { describe, beforeEach, jest, it, expect } from '@jest/globals';
import { Studio } from '../../src/domain/studio.js';


import { InMemoryStudioRepository } from '../../src/repositories/inMemoryStudioRepository.js';

describe('In-Memory Studio Repository', () => {
  it('should create a Studio and persist it', async() => {
    // Arrange
    const repo = new InMemoryStudioRepository();
    const newStudio = new Studio('studio-1', 'owner-1', 'VG Studio', '123 Main St.');

    // Act
    await repo.saveStudio(newStudio);
    const savedStudio = await repo.getStudioById('studio-1');

    // Assert
    expect(savedStudio).toEqual(newStudio);
  });

  it('should return a collection of Studios', async () => {
    // Arrange
    const repo = new InMemoryStudioRepository();
    const newStudio1 = new Studio('studio-1', 'owner-1', 'VG Studio', '123 Main St.');
    const newStudio2 = new Studio('studio-2', 'owner-2', 'YA Studio', '456 Dreary Ln.');
    await repo.saveStudio(newStudio1);
    await repo.saveStudio(newStudio2);

    // Act
    const studios = await repo.getAllStudios();

    // Assert
    expect(studios).toEqual([newStudio1, newStudio2]);
  });

  it('should return a studio by id', async () => {
    // Arrange
    const repo = new InMemoryStudioRepository();
    const id = 'studio-1';
    const expectedStudio = new Studio(id, 'owner-1', 'VG Studio', '123 Main St.');
    await repo.saveStudio(expectedStudio);

    // Act
    const studio = await repo.getStudioById(id);

    // Assert
    expect(studio).toEqual(expectedStudio)
  });
});