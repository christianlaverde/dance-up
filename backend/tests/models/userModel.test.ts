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
      // Variable to capture the QueryConfig passed to db.query
      let capturedQuery: QueryConfig | undefined;
      const mockQuery = async (query: QueryConfig): Promise<{ rows: any[] }> => {
        capturedQuery = query;
        return { rows: mockUsers };
      }
      const userModel = new UserModel({ query: mockQuery });

      // Act: Call function under test
      const result = await userModel.getAllUsers();

      // Assert: Check that the returned data is as expected.
      expect(result).toEqual(mockUsers);
      // Assert: Verify that the query is defined.
      expect(capturedQuery).toBeDefined();
      // Check that the SQL query text contains the correct SELECT clause.
      expect(capturedQuery!.text).toMatch(/SELECT id, email, password_hash, first_name, last_name, role/);
    });
  });


  describe('getUserById', () => {
    it('should return one user by id', async () => {
      // Arrange: Set up mock data
      const mockUser = 
        {id: '1', email: 'user1@example.com', password_hash: 'hash1', 
         first_name: 'FName1', middle_name: 'MName1', last_name: 'LName1', role: 'owner'};
      // Variable to capture the QueryConfig passed to db.query
      let capturedQuery: QueryConfig | undefined;
      const mockQuery = async (query: QueryConfig): Promise<{ rows: any[] }> => {
        capturedQuery = query;
        return {rows: [mockUser]};
      }
      const userModel = new UserModel({ query: mockQuery });

      // Act: Call function under test
      const result = await userModel.getUserById('1');

      // Assert: Check that the returned data is as expected.
      expect(result).toEqual(mockUser);
      // Assert: Verify that the query is defined.
      expect(capturedQuery).toBeDefined();
      // Assert: Check that the SQL query text contains the correct SELECT clause.
      expect(capturedQuery!.text).toMatch(/SELECT id, email, password_hash, first_name, last_name, role/);
      // Assert: Verify the SQL query contains a WHERE clause with a parameter placeholder ($1)
      expect(capturedQuery!.text).toMatch(/WHERE id = \$1/);
      // Assert: Check that the value provided is correct.
      expect(capturedQuery!.values).toEqual(['1']);
    })
  });

  describe('getUserByEmail', () => {
    it('should return one user by email', async () => {
      // Arrange: Set up mock data
      const mockUser = 
        {id: '1', email: 'user1@example.com', password_hash: 'hash1', 
         first_name: 'FName1', middle_name: 'MName1', last_name: 'LName1', role: 'owner'}
        ;
      // Variable to capture the QueryConfig passed to db.query
      let capturedQuery: QueryConfig | undefined;
      const mockQuery = async (query: QueryConfig): Promise<{ rows: any[] }> => {
        capturedQuery = query;
        return {rows: [mockUser]};
      }
      const userModel = new UserModel({ query: mockQuery });

      // Act: Call function under test
      const result = await userModel.getUserByEmail('user1@example.com');

      // Assert: Check that the returned data is as expected.
      expect(result).toEqual(mockUser);
      // Assert: Verify that the query is defined.
      expect(capturedQuery).toBeDefined();
      // Assert: Check that the SQL query text contains the correct SELECT clause.
      expect(capturedQuery!.text).toMatch(/SELECT id, email, password_hash, first_name, last_name, role/);
      // Assert: Verify the SQL query contains a WHERE clause with a parameter placeholder ($1)
      expect(capturedQuery!.text).toMatch(/WHERE email = \$1/);
      // Assert: Check that the value provided is correct.
      expect(capturedQuery!.values).toEqual(['user1@example.com']);
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
      // Variable to capture the QueryConfig passed to db.query
      let capturedQuery: QueryConfig | undefined;
      const mockQuery = async (query: QueryConfig): Promise<{ rows: any[] }> => {
        capturedQuery = query;
        return {rows: [expectedUser]};
      }
      const userModel = new UserModel({ query: mockQuery });

      // Act: Call function under test
      const result = await userModel.insertUser(
        mockEmail, mockPassword, mockFName, mockMName, mockLName, mockRole
      );

      // Assert: Check mock returns expected result
      expect(result).toEqual(expectedUser);
      // Assert: Verify that the query is defined.
      expect(capturedQuery).toBeDefined();
      // Assert: Verify the query text contains an INSERT statement and RETURNING clause.
      expect(capturedQuery!.text).toMatch(/INSERT INTO users.*RETURNING/s);
      // Assert: Verify the values passed to the query are correct.
      expect(capturedQuery!.values).toEqual([
        mockEmail, mockPassword, mockFName, mockMName, mockLName, mockRole,
      ]);
    })
  });

});
