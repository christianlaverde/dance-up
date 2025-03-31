import { describe, beforeEach, jest, it, expect } from '@jest/globals';
import { UserModel } from '../../src/models/UserModel.js';
import { QueryConfig } from 'pg';
import { User, UserRole } from '../../src/models/user.js';

// Reusable Mock Query Helper, returns mock query and getCapturedQuery functions
function createMockQuery(returnedRows: any[]) {
  let capturedQuery: QueryConfig | undefined;
  const query = async (query: QueryConfig): Promise<{ rows: any[] }> => {
    capturedQuery = query;
    return { rows: returnedRows };
  }

  return { query, getCapturedQuery: () => capturedQuery };
}

// Helper function to check the shape of a User object
function expectUserShape(user: any) {
  expect(user).toBeDefined();
  expect(user).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      email: expect.any(String),
      password_hash: expect.any(String),
      first_name: expect.any(String),
      middle_name: expect.any(String),
      last_name: expect.any(String),
      role: expect.any(String),
    })
  );
  // Ensure user.role is of UserRole enum
  expect(Object.values(UserRole)).toContain(user.role);
}

describe("User Model", () => {
  // Initialize Mock Data
  let userModel: UserModel;
  let getCapturedQuery: () => QueryConfig | undefined;

  // Clear mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    describe('Happy Paths', () => {
      it('should return an array of users', async () => {
        // Arrange: Set Up Mock Data
        const mockData: User[] = [
          {id: '1', email: 'user1@example.com', password_hash: 'hash1', 
            first_name: 'FName1', middle_name: 'MName1', last_name: 'LName1', role: UserRole.OWNER},
          {id: '2', email: 'user2@example.com', password_hash: 'hash2', 
            first_name: 'FName2', middle_name: 'MName2', last_name: 'LName2', role: UserRole.MEMBER},
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
    })
  });

  describe('getUserById', () => {
    describe('Happy Paths', () => {
      it('should return one user by id', async () => {
        // Arrange: Set Up Mock Data
        const mockData: User[] = [
          {id: '1', email: 'user1@example.com', password_hash: 'hash1', 
            first_name: 'FName1', middle_name: 'MName1', last_name: 'LName1', role: UserRole.MEMBER},
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
    });
  });

  describe('getUserByEmail', () => {
    describe('Happy Paths', () => {
      it('should return one user by email', async () => {
        // Arrange: Set Up Mock Data
        const mockData: User[] = [
          {id: '1', email: 'user1@example.com', password_hash: 'hash1', 
            first_name: 'FName1', middle_name: 'MName1', last_name: 'LName1', role: UserRole.MEMBER},
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
      })

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
  
        const expectedUser: User = {
          id: '1',
          email: mockEmail,
          password_hash: mockPassword,
          first_name: mockFName,
          middle_name: mockMName,
          last_name: mockLName,
          role: mockRole
        };
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
