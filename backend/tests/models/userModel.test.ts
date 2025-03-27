import { describe, beforeEach, jest, it, expect } from '@jest/globals';
import { UserModel } from '../../src/models/UserModel.js';
import { QueryConfig } from 'pg';
import { User } from '../../src/models/User.entity.js';

describe("User Model", () => {
  // Clear mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      // Arrange: Set up mock data
      const mockUsers = [
        {id: '1', email: 'user1@example.com', password_hash: 'hash1', 
         first_name: 'FName1', middle_name: 'MName1', last_name: 'LName1', role: 'owner'},
        {id: '2', email: 'user2@example.com', password_hash: 'hash2', 
         first_name: 'FName2', middle_name: 'MName2', last_name: 'LName2', role: 'member'},
      ];
      const mockQuery = async (query: QueryConfig): Promise<{ rows: any[] }> => {
        return { rows: mockUsers };
      }
      const userModel = new UserModel({ query: mockQuery });

      // Act: Call function under test
      const result = await userModel.getAllUsers();

      // Assert: Check mock returns expected result
      expect(result).toEqual(mockUsers);
    });
  });


  describe('getUserById', () => {
    it('should return one user by id', async () => {
      // Arrange: Set up mock data
      const mockUser = 
        {id: '1', email: 'user1@example.com', password_hash: 'hash1', 
         first_name: 'FName1', middle_name: 'MName1', last_name: 'LName1', role: 'owner'};
      const mockQuery = async (query: QueryConfig): Promise<{ rows: any[] }> => {
        return {rows: [mockUser]};
      }
      const userModel = new UserModel({ query: mockQuery });

      // Act: Call function under test
      const result = await userModel.getUserById('1');

      // Assert: Check mock returns expected result
      expect(result).toEqual(mockUser);
    })
  });

  describe('getUserByEmail', () => {
    it('should return one user by email', async () => {
      // Arrange: Set up mock data
      const mockUser = 
        {id: '1', email: 'user1@example.com', password_hash: 'hash1', 
         first_name: 'FName1', middle_name: 'MName1', last_name: 'LName1', role: 'owner'}
        ;
      const mockQuery = async (query: QueryConfig): Promise<{ rows: any[] }> => {
        return {rows: [mockUser]};
      }
      const userModel = new UserModel({ query: mockQuery });

      // Act: Call function under test
      const result = await userModel.getUserById('user1@example.com');

      // Assert: Check mock returns expected result
      expect(result).toEqual(mockUser);
    })
  });

  describe('insertUser', () => {
    it('should insert and return one new user', async () => {
      // Arrange: Set up mock data
      const mockEmail = 'user@example.com';
      const mockPassword = 'hash';
      const mockFName = 'Fname';
      const mockMName = 'Mname';
      const mockLName = 'LName';
      const mockRole = 'member';

      const expectedUser: User = {
        id: '1',
        email: mockEmail,
        password_hash: mockPassword,
        first_name: mockFName,
        middle_name: mockMName,
        last_name: mockLName,
        role: mockRole
      }

      const mockQuery = async (query: QueryConfig): Promise<{ rows: any[] }> => {
        return {rows: [expectedUser]};
      }
      const userModel = new UserModel({ query: mockQuery });

      // Act: Call function under test
      const result = await userModel.insertUser(
        mockEmail, mockPassword, mockFName, mockMName, mockLName, mockRole
      );

      // Assert: Check mock returns expected result
      expect(result).toEqual(expectedUser);
    })
  });

});
