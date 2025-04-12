import { Class } from "./class.js";

/**
 * Value Object: StudioName
 * Ensures name is valid and properly formatted
 */
export class StudioName {
  readonly value: string;

  constructor(name: string) {
    if (!name || typeof name !== 'string' || name.trim() === '') {
      throw new Error('Invalid Studio name: must be a non-empty string');
    }
    this.value = name.trim();
    Object.freeze(this);
  }

  toString(): string {
    return this.value;
  }
}

// Type Guard for Value Objects
export function isStudioName(value: any): value is StudioName {
  return value instanceof StudioName;
}

export interface StudioOptions {
  id: string | null;
  ownerId: string;
  name: string | StudioName;
  address: string;
}

export class Studio {
  private readonly id: string;
  private ownerId: string;
  private name: StudioName;
  private address: string;
  private classes: Class[];

  constructor(options: StudioOptions) {
    // Convert primitive types to Value Objects if needed
    this.name = isStudioName(options.name) ? options.name : new StudioName(options.name);

    // Validate primitives
    if (!options.id || typeof options.id !== 'string' || options.id.trim() === '') {
      throw new Error('Invalid Studio id: must be a non-empty string');
    }
    if (!options.ownerId || typeof options.ownerId !== 'string' || options.ownerId.trim() === '') {
      throw new Error('Invalid Studio ownerId: must be a non-empty string');
    }
    if (!options.address || typeof options.address !== 'string' || options.address.trim() === '') {
      throw new Error('Invalid Studio ownerId: must be a non-empty string');
    }

    this.id = options.id;
    this.ownerId = options.ownerId;
    this.address = options.address;
    this.classes = [];
  };

  addClass(cls: Class) {
    this.classes.push(cls);
  }

  getClasses() {
    return this.classes;
  }

  setClasses(classes: Class[]) {
    this.classes = classes;
  }

  getId() {
    if (!this.id) throw new Error('Studio ID not set.');
    return this.id;
  }

  getOwnerId() {
    return this.ownerId;
  }

  getName() {
    return this.name.toString();
  }

  getNameObject() {
    return this.name;
  }

  getAddress() {
    return this.address;
  }
}
