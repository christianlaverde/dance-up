import { jest, describe, beforeEach, it, expect } from '@jest/globals';
import { UserModel } from '../../src/models/UserModel.js';
import { UserService } from '../../src/services/UserService.js';
import { User } from '../../src/models/user.js';

describe("User Service", () => {
  // Clear mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should return an array of all users', async () => {
      // Arrange: Set up mock data
      const mockUsers: User[] = [
        {id: '1', email: 'user1@example.com', password_hash: 'hash1', 
         first_name: 'FName1', middle_name: 'MName1', last_name: 'LName1', role: 'owner'},
        {id: '2', email: 'user2@example.com', password_hash: 'hash2', 
         first_name: 'FName2', middle_name: 'MName2', last_name: 'LName2', role: 'member'},
      ];
      const mockUserModel = {
        getAllUsers: jest.fn().mockImplementation(() => Promise.resolve(mockUsers)),
      }
      const userService = new UserService(mockUserModel as unknown as UserModel);

      // Act: Call function under test
      const result = await userService.getAllUsers();

      // Assert: Check mock returns expected result
      expect(result).toEqual(mockUsers);
    });
  });

  describe('getUserById', () => {
    it('should return one user by id', async () => {
      // Arrange: Set up mock data
      const mockUser: User = 
        {id: '1', email: 'user1@example.com', password_hash: 'hash1', 
         first_name: 'FName1', middle_name: 'MName1', last_name: 'LName1', role: 'owner'};
      const mockUserModel = {
        getUserById: jest.fn().mockImplementation(() => Promise.resolve(mockUser))
      }
      const userService = new UserService(mockUserModel as unknown as UserModel);

      // Act: Call function under test
      const result = await userService.getUserById('1');

      // Assert: Check mock returns expected result
      expect(result).toEqual(mockUser);
    });
  });

  describe('getUserByEmail', () => {
    it('should return one user by email', async () => {
      // Arrange: Set up mock data
      const mockUser: User = 
        {id: '1', email: 'user1@example.com', password_hash: 'hash1', 
         first_name: 'FName1', middle_name: 'MName1', last_name: 'LName1', role: 'owner'};
      const mockUserModel = {
        getUserByEmail: jest.fn().mockImplementation(() => Promise.resolve(mockUser))
      }
      const userService = new UserService(mockUserModel as unknown as UserModel);

      // Act: Call function under test
      const result = await userService.getUserByEmail('user1@example.com');

      // Assert: Check mock returns expected result
      expect(result).toEqual(mockUser);
    });
  });

  describe('createUser', () => {
    it('should create and return one new user', async () => {
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
      const mockUserModel = {
        insertUser: jest.fn().mockImplementation(() => Promise.resolve(expectedUser))
      }
      const userService = new UserService(mockUserModel as unknown as UserModel);

      // Act: Call function under test
      const result = await userService.createUser(
        mockEmail, mockPassword, mockFName, mockMName, mockLName, mockRole
      );

      // Assert: Check mock returns expected result
      expect(result).toEqual(expectedUser);
    })
  });
});