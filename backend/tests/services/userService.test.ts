import { describe, beforeEach, jest, it, expect } from '@jest/globals';
import { UserModel } from '../../src/models/UserModel.js';
import { UserService } from '../../src/services/userService.js';
import { QueryConfig } from 'pg';
import { User, UserRole } from '../../src/entities/user.js';
import { expectUserShape } from '../helperFunctions.js';
import { getDefaultResultOrder } from 'dns';

describe('User Service', () => {
  // Initialize Mock Data
  let mockUserModel: jest.Mocked<UserModel>;
  let userService: UserService;

  // Clear mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    mockUserModel = {
      getAllUsers: jest.fn(),
      getUserById: jest.fn(),
      getUserByEmail: jest.fn(),
      insertUser: jest.fn(),
    } as unknown as jest.Mocked<UserModel>;
    userService = new UserService(mockUserModel);
  });

  describe('getAllUsers', () => {
    describe('Happy Paths', () => {
      it('should return an array of users', async () => {
        // Arrange
        const mockData: User[] = [
          {id: '1', email: 'user1@example.com', password_hash: 'hash1', 
            first_name: 'FName1', middle_name: 'MName1', last_name: 'LName1', role: UserRole.OWNER},
          {id: '2', email: 'user2@example.com', password_hash: 'hash2', 
            first_name: 'FName2', middle_name: 'MName2', last_name: 'LName2', role: UserRole.MEMBER},
        ];
        mockUserModel.getAllUsers.mockResolvedValue(mockData);
        
        // Act
        const result = await userService.getAllUsers();

        // Assert
        expect(result).toEqual(mockData);
        result.forEach(expectUserShape);
        expect(mockUserModel.getAllUsers).toHaveBeenCalledTimes(1);
      });
    });

    describe('Sad Paths', () => {
      it('should return an empty array if no users are found', async () => {
        // Arrange
        mockUserModel.getAllUsers.mockResolvedValue([]);

        // Act
        const result = await userService.getAllUsers();

        // Assert
        expect(result).toEqual([]);
        expect(mockUserModel.getAllUsers).toHaveBeenCalledTimes(1);
      });

      it('should propagate error when the underlying model fails', async () => {
        // Arrange
        mockUserModel.getAllUsers.mockRejectedValue(new Error("Database Error"));

        // Act & Assert
        await expect(userService.getAllUsers()).rejects.toThrow("Database Error");
      });
    });
  });

  describe('getUserById', () => {
    describe('Happy Paths', () => {
      it('should return a user when found', async () => {
        // Arrange
        const mockUser = { 
          id: '1', email: 'user1@example.com', password_hash: 'hash1', 
          first_name: 'FName1', middle_name: 'MName1', last_name: 'LName1', role: UserRole.MEMBER 
        };
        mockUserModel.getUserById.mockResolvedValue(mockUser);

        // Act
        const result = await userService.getUserById('1');

        // Assert
        expect(result).toEqual(mockUser);
        expectUserShape(result);
        expect(mockUserModel.getUserById).toHaveBeenCalledTimes(1);
        expect(mockUserModel.getUserById).toHaveBeenCalledWith('1');
      });
    });

    describe('Sad Paths', () => {
      it('should return null when no user is found', async () => {
        // Arrange
        mockUserModel.getUserById.mockResolvedValue(null);

        // Act
        const result = await userService.getUserById('1');

        // Assert
        expect(result).toBeNull();
        expect(mockUserModel.getUserById).toHaveBeenCalledTimes(1);
        expect(mockUserModel.getUserById).toHaveBeenCalledWith('1');
      });


      it('should propagate error when the underlying model fails', async () => {
        // Arrange
        mockUserModel.getUserById.mockRejectedValue(new Error("Database Error"));

        // Act & Assert
        await expect(userService.getUserById('1')).rejects.toThrow("Database Error");
      });
    });
  });

  describe('getUserByEmail', () => {
    describe('Happy Paths', () => {
      it('should return a user when found by email', async () => {
        // Arrange
        const mockUser = { 
          id: '1', email: 'user1@example.com', password_hash: 'hash1', 
          first_name: 'FName1', middle_name: 'MName1', last_name: 'LName1', role: UserRole.MEMBER 
        };
        mockUserModel.getUserByEmail.mockResolvedValue(mockUser);

        // Act
        const result = await userService.getUserByEmail('user1@example.com');

        // Assert
        expect(result).toEqual(mockUser);
        expectUserShape(result);
        expect(mockUserModel.getUserByEmail).toHaveBeenCalledTimes(1);
        expect(mockUserModel.getUserByEmail).toHaveBeenCalledWith('user1@example.com');
      });
    });

    describe('Sad Paths', () => {
      it('should return null when no user is found by email', async () => {
        // Arrange
        mockUserModel.getUserByEmail.mockResolvedValue(null);

        // Act
        const result = await userService.getUserByEmail('user1@example.com');

        // Assert
        expect(result).toBeNull();
        expect(mockUserModel.getUserByEmail).toHaveBeenCalledTimes(1);
        expect(mockUserModel.getUserByEmail).toHaveBeenCalledWith('user1@example.com');
      });

      it('should propagate error when the underlying model fails', async () => {
        // Arrange
        mockUserModel.getUserByEmail.mockRejectedValue(new Error("Database Error"));

        // Act & Assert
        await expect(userService.getUserByEmail('user1@example.com')).rejects.toThrow("Database Error");
      });
    });
  });

  describe('createUser', () => {
    describe('Happy Paths', () => {
      it('should create and return a new user', async () => {
        // Arrange
        const mockUser = { 
          id: '1', email: 'user@example.com', password_hash: 'hash',
          first_name: 'Fname', middle_name: 'Mname', last_name: 'LName', role: UserRole.MEMBER 
        };
        mockUserModel.insertUser.mockResolvedValue(mockUser);

        // Act
        const result = await userService.createUser(
          'user@example.com', 'hash', 'Fname', 'Mname', 'LName', UserRole.MEMBER
        );

        // Assert
        expect(result).toEqual(mockUser);
        expectUserShape(result);
        expect(mockUserModel.insertUser).toHaveBeenCalledTimes(1);
        expect(mockUserModel.insertUser).toHaveBeenCalledWith(
          'user@example.com', 'hash', 'Fname', 'Mname', 'LName', UserRole.MEMBER
        );
      });
    });

    describe('Sad Paths', () => {
      it('should return null when underlying model returns null', async () => {
        // Arrange
        mockUserModel.insertUser.mockResolvedValue(null);

        // Act
        const result = await userService.createUser(
          'user@example.com', 'hash', 'Fname', 'Mname', 'LName', UserRole.MEMBER
        );

        // Assert
        expect(result).toBeNull();
        expect(mockUserModel.insertUser).toHaveBeenCalledTimes(1);
        expect(mockUserModel.insertUser).toHaveBeenCalledWith(
          'user@example.com', 'hash', 'Fname', 'Mname', 'LName', UserRole.MEMBER
        );
      });

      it('should propagate error when the underlying model fails', async () => {
        // Arrange
        mockUserModel.insertUser.mockRejectedValue(new Error("Database Error"));

        // Act & Assert
        await expect(userService.createUser(
          'user@example.com', 'hash', 'Fname', 'Mname', 'LName', UserRole.MEMBER
        )).rejects.toThrow("Database Error");
      });
    });
  });
});
