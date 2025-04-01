import { describe, beforeEach, jest, it, expect } from '@jest/globals';
import { UserModel } from '../../src/models/UserModel.js';
import { QueryConfig } from 'pg';
import { User, UserRole } from '../../src/entities/user.js';
import { expectUserShape, createMockQuery } from '../helperFunctions.js';


describe("User Model", () => {
  // Initialize Mock Data
  let userModel: UserModel;

  // Clear mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    describe('Happy Paths', () => {
      it('should return an array of users', async () => {
        // Arrange: Set Up Mock Data
        const mockData: User[] = [
          new User('1', 'user1@example.com', 'hash1', 'Fname1', 'Lname1', UserRole.OWNER, 'Mname1'),
          new User('2', 'user2@example.com', 'hash2', 'Fname2', 'Lname2', UserRole.MEMBER, 'Mname2')
        ];
        const { query, getCapturedQuery } = createMockQuery(mockData);
        userModel = new UserModel({ query });

        // Act: Call function under test
        const result = await userModel.getAllUsers();
        const capturedQuery = getCapturedQuery();
  
        // Assert: Check that the returned data is as expected.
        expect(result).toEqual(mockData);
        // Assert: Verify that the query is defined.
        expect(capturedQuery).toBeDefined();
        // Assert: Check that returned data is of shape User
        result.forEach(expectUserShape);
        // Assert: Check that the SQL query text contains the correct SELECT clause.
        expect(capturedQuery!.text).toMatch(/SELECT id, email, password_hash, first_name, last_name, role/);
      });
    });

    describe('Sad Paths', () => {
      it('should return empty array if no users found', async () => {
        // Arrange: Set Up Mock Data
        const mockData: User[] = [];
        const { query, getCapturedQuery } = createMockQuery(mockData);
        userModel = new UserModel({ query });

        // Act: Call function under test
        const result = await userModel.getAllUsers();
        const capturedQuery = getCapturedQuery();

        // Assert: Check that the returned data is as expected.
        expect(result).toEqual([]);
        // Assert: Verify that the query is defined.
        expect(capturedQuery).toBeDefined();
      });

      it('should propagate an error when db.query fails and throws an exception', async () => {
        // Arrange: Set Up Mock Data
        const mockQuery = async () => {
          throw new Error('Database Error');
        }
        userModel = new UserModel({ query: mockQuery });

       // Act/Assert: Expect that error is thrown
       await expect(userModel.getAllUsers()).rejects.toThrow('Database Error');
      });
    })
  });

  describe('getUserById', () => {
    describe('Happy Paths', () => {
      it('should return one user by id', async () => {
        // Arrange: Set Up Mock Data
        const mockData: User[] = [
            new User('1', 'user1@example.com', 'hash1', 'Fname1', 'Lname1', UserRole.OWNER, 'Mname1')
        ];
        const { query, getCapturedQuery } = createMockQuery(mockData);
        userModel = new UserModel({ query });

        // Act: Call function under test
        const result = await userModel.getUserById('1');
        const capturedQuery = getCapturedQuery();

        // Assert: Check that the returned data is as expected.
       expect(result).toEqual(mockData[0]);
        // Assert: Verify that the query is defined.
        expect(capturedQuery).toBeDefined();
       // Assert: Check that the SQL query text contains the correct SELECT clause.
       expect(capturedQuery!.text).toMatch(/SELECT id, email, password_hash, first_name, last_name, role/);
       // Assert: Verify the SQL query contains a WHERE clause with a parameter placeholder ($1)
       expect(capturedQuery!.text).toMatch(/WHERE id = \$1/);
       // Assert: Check that the value provided is correct.
       expect(capturedQuery!.values).toEqual(['1']);
      });
     });

    describe('Sad Paths', () => {
      it('should return null when no user is found', async () => {
        // Arrange: Set Up Mock Data
        const mockData = [];
        const { query, getCapturedQuery } = createMockQuery(mockData);
        userModel = new UserModel({ query } );

        // Act: Call function under test.
        const result = await userModel.getUserById('1');
        const capturedQuery = getCapturedQuery();

        // Assert: Check that the returned data is as expected.
        expect(result).toBeNull();
        // Assert: Verify that the query is defined.
        expect(capturedQuery).toBeDefined();
      });

      it('should propagate an error when db.query fails and throws an exception', async () => {
        // Arrange: Set Up Mock Data
        const mockQuery = async () => {
          throw new Error('Database Error');
        }
        userModel = new UserModel({ query: mockQuery });

       // Act/Assert: Expect that error is thrown
       await expect(userModel.getUserById('1')).rejects.toThrow('Database Error');
      });
    });
  });

  describe('getUserByEmail', () => {
    describe('Happy Paths', () => {
      it('should return one user by email', async () => {
        // Arrange: Set Up Mock Data
        const mockData: User[] = [
          new User('1', 'user1@example.com', 'hash1', 'Fname1', 'Lname1', UserRole.OWNER, 'Mname1')
        ];
        const { query, getCapturedQuery } = createMockQuery(mockData);
        userModel = new UserModel({ query });

        // Act: Call function under test
        const result = await userModel.getUserByEmail('user1@example.com');
        const capturedQuery = getCapturedQuery();

        // Assert: Check that the returned data is as expected.
       expect(result).toEqual(mockData[0]);
        // Assert: Verify that the query is defined.
        expect(capturedQuery).toBeDefined();
       // Assert: Check that the SQL query text contains the correct SELECT clause.
       expect(capturedQuery!.text).toMatch(/SELECT id, email, password_hash, first_name, last_name, role/);
       // Assert: Verify the SQL query contains a WHERE clause with a parameter placeholder ($1)
       expect(capturedQuery!.text).toMatch(/WHERE email = \$1/);
       // Assert: Check that the value provided is correct.
       expect(capturedQuery!.values).toEqual(['user1@example.com']);
      });

    });

    describe('Sad Paths', () => {
      it('should return null when no user is found', async () => {
        // Arrange: Set Up Mock Data
        const mockData = [];
        const { query, getCapturedQuery } = createMockQuery(mockData);
        userModel = new UserModel({ query } );

        // Act: Call function under test.
        const result = await userModel.getUserByEmail('user1@example.com');
        const capturedQuery = getCapturedQuery();

        // Assert: Check that the returned data is as expected.
        expect(result).toBeNull();
        // Assert: Verify that the query is defined.
        expect(capturedQuery).toBeDefined();
      });

      it('should propagate an error when db.query fails and throws an exception', async () => {
        // Arrange: Set Up Mock Data
        const mockQuery = async () => {
          throw new Error('Database Error');
        }
        userModel = new UserModel({ query: mockQuery });

       // Act/Assert: Expect that error is thrown
       await expect(userModel.getUserByEmail('user1@example.com')).rejects.toThrow('Database Error');
      });
    });
  });

  describe('insertUser', () => {
    describe('Happy Paths', () => {
      it('should insert and return one new user', async () => {
        // Arrange: Set up mock data
        const mockEmail = 'user@example.com';
        const mockPassword = 'hash';
        const mockFName = 'Fname';
        const mockMName = 'Mname';
        const mockLName = 'LName';
        const mockRole = UserRole.MEMBER;
  
        const expectedUser: User = new User(
          '1', 'user1@example.com', 'hash1', 'Fname1', 'Lname1', UserRole.OWNER, 'Mname1'
        )
        const { query, getCapturedQuery } = createMockQuery([expectedUser]);
        userModel = new UserModel({ query });

  
        // Act: Call function under test
        const result = await userModel.insertUser(
          mockEmail, mockPassword, mockFName, mockMName, mockLName, mockRole
        );
        const capturedQuery = getCapturedQuery();
  
        // Assert: Check mock returns expected result
        expect(result).toEqual(expectedUser);
        // Assert: Verify that the query is defined.
        expect(capturedQuery).toBeDefined();
        // Assert: Verify the query text contains an INSERT statement and RETURNING clause.
        expect(capturedQuery!.text).toMatch(/INSERT INTO users.*RETURNING/s);
        // Assert: Verify the values passed to the query are correct.
        expect(capturedQuery!.values).toEqual([
          mockEmail, mockPassword, mockFName, mockMName, mockLName, mockRole
        ]);
      })
    });

    describe('Sad Paths', () => {
      it('should propagate an error when db.query fails and throws an exception', async () => {
        // Arrange: Set Up Mock Data
        const mockEmail = 'user@example.com';
        const mockPassword = 'hash';
        const mockFName = 'Fname';
        const mockMName = 'Mname';
        const mockLName = 'LName';
        const mockRole = UserRole.MEMBER;
        const mockQuery = async () => {
          throw new Error('Database Error');
        }
        userModel = new UserModel({ query: mockQuery });

       // Act/Assert: Expect that error is thrown
       await expect(userModel.insertUser(
          mockEmail, mockPassword, mockFName, mockMName, mockLName, mockRole
       )).rejects.toThrow('Database Error');
      });

      it('should return null when no user is returned after insertion', async () => {
        // Arrange: Set Up Mock Data
        const mockEmail = 'user@example.com';
        const mockPassword = 'hash';
        const mockFName = 'Fname';
        const mockMName = 'Mname';
        const mockLName = 'LName';
        const mockRole = UserRole.MEMBER;
        const { query } = createMockQuery([]);
        userModel = new UserModel({ query });

        // Act: Call function under test
        const result = await userModel.insertUser(
          mockEmail, mockPassword, mockFName, mockMName, mockLName, mockRole
        );

        // Assert: Expect that value returned is null
        expect(result).toBeNull();
      });
    });
  });
});
