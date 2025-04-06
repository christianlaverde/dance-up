import { Class } from "./class.js";

export class Studio {
  private id: string;
  private ownerId: string;
  private studioName: string;
  private address: string;
  private classes: Class[];

  constructor(id: string, ownerId: string, studioName: string, address: string) {
    this.id = id;
    this.ownerId = ownerId;
    this.studioName = studioName;
    this.address = address;
    this.classes = [];
  }

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
    return this.id;
  }

  getOwnerId() {
    return this.ownerId;
  }

  getStudioName() {
    return this.studioName;
  }

  getAddress() {
    return this.address;
  }
}
