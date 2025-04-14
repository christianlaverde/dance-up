import { describe, beforeEach, jest, it, expect } from '@jest/globals';
import { Studio } from '../../src/domain/studio.js';


import { InMemoryStudioRepository } from '../../src/repositories/inMemoryStudioRepository.js';

describe('In-Memory Studio Repository', () => {
  it('should create a Studio and persist it', async() => {
    // Arrange
    const repo = new InMemoryStudioRepository();
    const newStudio = new Studio({
      id: 'studio-1', 
      ownerId: 'owner-1', 
      name: 'VG Studio',
      address: '123 Main St.'
    });

    // Act
    await repo.save(newStudio);
    const savedStudio = await repo.findById('studio-1');

    // Assert
    expect(savedStudio).toEqual(newStudio);
  });

  it('should return a collection of Studios', async () => {
    // Arrange
    const repo = new InMemoryStudioRepository();
    const newStudio1 = new Studio({
      id: 'studio-1', 
      ownerId: 'owner-1', 
      name: 'VG Studio', 
      address: '123 Main St.'
    });
    const newStudio2 = new Studio({
      id: 'studio-2', 
      ownerId: 'owner-2', 
      name: 'YA Studio', 
      address: '456 Dreary Ln.'
    });
    await repo.save(newStudio1);
    await repo.save(newStudio2);

    // Act
    const studios = await repo.findAll();

    // Assert
    expect(studios).toEqual([newStudio1, newStudio2]);
  });

  it('should return a studio by id', async () => {
    // Arrange
    const repo = new InMemoryStudioRepository();
    const id = 'studio-1';
    const expectedStudio = new Studio({
      id: id, 
      ownerId: 'owner-1', 
      name: 'VG Studio', 
      address: '123 Main St.'
    });
    await repo.save(expectedStudio);

    // Act
    const studio = await repo.findById(id);

    // Assert
    expect(studio).toEqual(expectedStudio)
  });
});