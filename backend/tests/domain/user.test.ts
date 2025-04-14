import { describe, beforeEach, jest, it, expect } from '@jest/globals';
import { User, USER_ROLE, UserOptions } from '../../src/domain/user.js';


describe('User Entity', () => {
  describe('Happy Paths', () => {
    it('should create a new User entity without optional params', () => {
      // Arrange
      const userOpts: UserOptions = {
        id: 'user-1',
        email: 'user1@ex.com',
        passwordHash: 'pw1',
        firstName: 'John',
        lastName: 'Doe',
        role: USER_ROLE.MEMBER
      }
  
      // Act
      const expectedUser = new User(userOpts);
  
      // Assert
      expect(expectedUser).toBeInstanceOf(User);
    });

    it('should create a new class object with optional params', () => {
      // Arrange
      const userOpts: UserOptions = {
        id: 'user-1',
        email: 'user1@ex.com',
        passwordHash: 'pw1',
        firstName: 'John',
        middleName: 'M.', // optional param
        lastName: 'Doe',
        role: USER_ROLE.MEMBER
      }

      // Act
      const user = new User(userOpts);
  
      // Assert
      expect(user).toBeInstanceOf(User);
    });
  });


  describe('Sad Paths', () => {
    it('should throw an error on class creation (invalid id)', () => {
      // Arrange
      const userOpts: UserOptions = {
        id: '',
        email: 'user1@ex.com',
        passwordHash: 'pw1',
        firstName: 'John',
        middleName: 'M.', // optional param
        lastName: 'Doe',
        role: USER_ROLE.MEMBER
      }

      // Act / Assert
      expect(() => new User(userOpts)).toThrow('Invalid User id: must be a non-empty string');
    });

    it('should throw an error on class creation (invalid email)', () => {
      // Arrange
      const userOpts: UserOptions = {
        id: 'user-1',
        email: '',
        passwordHash: 'pw1',
        firstName: 'John',
        middleName: 'M.', // optional param
        lastName: 'Doe',
        role: USER_ROLE.MEMBER
      }

      // Act / Assert
      expect(() => new User(userOpts)).toThrow('Invalid User email: must be a non-empty string');
    });

    it('should throw an error on class creation (invalid firstName)', () => {
      // Arrange
      const userOpts: any = {
        id: 'user-1',
        email: 'user1@ex.com',
        passwordHash: 'pw1',
        firstName: '',
        middleName: 'M.', // optional param
        lastName: 'Doe',
        role: USER_ROLE.MEMBER
      }

      // Act / Assert
      expect(() => new User(userOpts)).toThrow('Invalid User firstName: must be a non-empty string');
    });

    it('should throw an error on class creation (invalid lastName)', () => {
      // Arrange
      const classOpts: any = {
        id: 'user-1',
        email: 'user1@ex.com',
        passwordHash: 'pw1',
        firstName: 'John',
        middleName: 'M.', // optional param
        lastName: '',
        role: USER_ROLE.MEMBER
      }

      // Act / Assert
      expect(() => new User(classOpts)).toThrow('Invalid User lastName: must be a non-empty string');
    });

    it('should throw an error on class creation (invalid user role)', () => {
      // Arrange
      const userOpts: any = {
        id: 'user-1',
        email: 'user1@ex.com',
        passwordHash: 'pw1',
        firstName: 'John',
        middleName: 'M.', // optional param
        lastName: 'Doe',
        role: 'hater'
      }
      // Act / Assert
      expect(() => new User(userOpts)).toThrow('Invalid User role: provided role must be a valid USER_ROLE');
    });
  });
});