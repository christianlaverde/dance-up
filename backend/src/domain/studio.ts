import { Class } from "./class.js";

export class Studio {
  private classes: Class[];

  constructor(
    private id: string | null,
    private ownerId: string,
    private name: string,
    private address: string,
  ) { 
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
    return this.name;
  }

  getAddress() {
    return this.address;
  }
}
