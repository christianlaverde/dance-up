export enum USER_ROLE {
  OWNER = 'owner',
  MEMBER = 'member'
}

// Type Guard for USER_ROLE
export function isUserRole(value: any): value is USER_ROLE {
  return Object.values(USER_ROLE).includes(value);
}

/**
 * User Entity and related interfaces
 */
export interface UserOptions {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  role: USER_ROLE;
}

export class User {
  private id: string;
  private email: string;
  private passwordHash: string;
  private firstName: string;
  private middleName: string;
  private lastName: string;
  private role: USER_ROLE;

  constructor(options: UserOptions) {
    if (!options.id || typeof options.id !== 'string' || options.id.trim() === '') {
      throw new Error('Invalid User id: must be a non-empty string');
    }

    if (!options.email || typeof options.email !== 'string' || options.email.trim() === '') {
      throw new Error('Invalid User email: must be a non-empty string');
    }

    if (!options.passwordHash || typeof options.passwordHash !== 'string' || options.passwordHash.trim() === '') {
      throw new Error('Invalid User passwordHash: must be a non-empty string');
    }

    if (!options.firstName || typeof options.firstName !== 'string' || options.firstName.trim() === '') {
      throw new Error('Invalid User firstName: must be a non-empty string');
    }

    // Validate middleName type if it's provided
    if (options.middleName !== undefined && typeof options.middleName !== 'string') {
      throw new Error('Invalid User middleName: must be a string');
    }

    if (!options.lastName || typeof options.lastName !== 'string' || options.lastName.trim() === '') {
      throw new Error('Invalid User lastName: must be a non-empty string');
    }

    if (!options.id || typeof options.id !== 'string' || options.id.trim() === '') {
      throw new Error('Invalid Class id: must be a non-empty string');
    }

    if (!isUserRole(options.role)) {
      throw new Error('Invalid Class role: provided role must be a valid');
    }

    this.id = options.id;
    this.email = options.email;
    this.passwordHash = options.passwordHash;
    this.firstName = options.firstName;
    this.middleName = options.middleName !== undefined ? options.middleName : '';
    this.lastName = options.lastName;
    this.role = options.role;
  }

  getId(): string {
    return this.id;
  }

  setId(id: string): void {
    this.id = id;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  getPasswordHash(): string {
    return this.passwordHash;
  }

  setPasswordHash(password_hash: string): void {
    this.passwordHash = password_hash;
  }

  getFirstName(): string {
    return this.firstName;
  }

  setFirstName(first_name: string): void {
    this.firstName = first_name;
  }

  getMiddleName(): string {
    return this.middleName;
  }

  setMiddleName(middle_name: string): void {
    this.middleName = middle_name;
  }

  getLastName(): string {
    return this.lastName;
  }

  setLastName(last_name: string): void {
    this.lastName = last_name;
  }

  getRole(): USER_ROLE {
    return this.role;
  }

  setRole(role: USER_ROLE): void {
    this.role = role;
  }
}
