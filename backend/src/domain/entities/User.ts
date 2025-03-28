/**
 * User Domain Entity
 *
 * Represents a User within the domain, encapsulating both data and behavior.
 * The class exposes only necessary methods and enforces any domain rules
 * (e.g., constructing a full name, updating properties with validation, etc.)
 */

export class User {
  private readonly id: string;
  private email: string;
  private passwordHash: string;
  private firstName: string;
  private middleName?: string;
  private lastName: string;
  private role: "owner" | "member";

  /**
   * Constructs a new User entity.
   * @param params - An object containing all required properties.
   */
  constructor(params: {
    id: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role: "owner" | "member";
    middleName?: string;
  }) {
    this.id = params.id;
    this.email = params.email;
    this.passwordHash = params.passwordHash;
    this.firstName = params.firstName;
    this.middleName = params.middleName;
    this.lastName = params.lastName;
    this.role = params.role;
  }

  // Getters to access properties

  getId(): string {
    return this.id;
  }
  
  getEmail(): string {
    return this.email;
  }
  
  getPasswordHash(): string {
    return this.passwordHash;
  }
  
  getFirstName(): string {
    return this.firstName;
  }
  
  getMiddleName(): string | undefined {
    return this.middleName;
  }
  
  getLastName(): string {
    return this.lastName;
  }
  
  getRole(): "owner" | "member" {
    return this.role;
  }

  /**
  * Returns the full name of the user by combining first, middle (if present), and last names.
  */
  getFullName(): string {
    return `${this.firstName} ${this.middleName ? this.middleName + ' ' : ''}${this.lastName}`.trim();
  }

  
}