import { Class } from "./class.js";

export class Studio {
  private studioName: string;
  private classes: Class[] = [];

  constructor(studioName: string) {
    this.studioName = studioName;
  }

  addClass(cls: Class) {
    this.classes.push(cls);
  }

  getClasses() {
    return this.classes;
  }

  getStudioName() {
    return this.studioName;
  }
}
