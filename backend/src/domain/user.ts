export enum UserRole {
  OWNER = 'owner',
  MEMBER = 'member'
}

export class User {
  private id: string;
  private email: string;
  private password_hash: string;
  private first_name: string;
  private middle_name: string;
  private last_name: string;
  private role: UserRole;

  constructor(
    id: string,
    email: string,
    password_hash: string,
    first_name: string,
    last_name: string,
    role: UserRole,
    middle_name?: string,
  ) {
    this.id = id;
    this.email = email;
    this.password_hash = password_hash;
    this.first_name = first_name;
    this.middle_name = middle_name || '';
    this.last_name = last_name;
    this.role = role;
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
    return this.password_hash;
  }

  setPasswordHash(password_hash: string): void {
    this.password_hash = password_hash;
  }

  getFirstName(): string {
    return this.first_name;
  }

  setFirstName(first_name: string): void {
    this.first_name = first_name;
  }

  getMiddleName(): string {
    return this.middle_name;
  }

  setMiddleName(middle_name: string): void {
    this.middle_name = middle_name;
  }

  getLastName(): string {
    return this.last_name;
  }

  setLastName(last_name: string): void {
    this.last_name = last_name;
  }

  getRole(): UserRole {
    return this.role;
  }

  setRole(role: UserRole): void {
    this.role = role;
  }
}
