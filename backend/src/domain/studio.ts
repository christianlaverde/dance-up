import { Class } from "./class.js";
import { AddressOptions, AddressVO, isAddressVO } from "./address.js";

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
  id: string | undefined;
  ownerId: string;
  name: string | StudioName;
  address: AddressVO | AddressOptions;
}

export class Studio {
  private id: string | undefined;
  private ownerId: string;
  private name: StudioName;
  private address: AddressVO;
  // private classes: Class[];
  private classes: Map<string, Class>;

  constructor(options: StudioOptions) {
    // Convert primitive types to Value Objects if needed
    this.name = isStudioName(options.name) ? options.name : new StudioName(options.name);
    this.address = isAddressVO(options.address) ? options.address : new AddressVO(options.address);

    // Validate primitives
    if (options.id !== undefined && (typeof options.id !== 'string' || options.id.trim() === '')) {
      throw new Error('Invalid Studio id: must be a non-empty string or undefined');
    }
    if (!options.ownerId || typeof options.ownerId !== 'string' || options.ownerId.trim() === '') {
      throw new Error('Invalid Studio ownerId: must be a non-empty string');
    }

    this.id = options.id;
    this.ownerId = options.ownerId;
    this.classes = new Map();
  };

  addClass(cls: Class) {
    const clsId = cls.getId();
    if (clsId !== undefined) {
      this.classes.set(clsId, cls);
    }
  }

  getClasses() {
    return Array.from(this.classes.values());
  }

  getId(): string | undefined {
    return this.id;
  }

  setId(id: string) {
    this.id = id;
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
