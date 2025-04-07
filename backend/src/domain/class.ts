import { DateTime } from 'luxon';

export class Class {
  private id: string;
  private studioId: string;
  private name: string;
  private description: string;

  constructor(
    classId: string, studioId: string, className: string, classDescription: string
  ) {
    this.id = classId;
    this.studioId = studioId;
    this.name = className;
    this.description = classDescription;
  }

  getId() {
    return this.id;
  }

  getStudioId() {
    return this.studioId;
  }

  getClassName() {
    return this.name;
  }

  getClassDescription() {
    return this.description;
  }
}