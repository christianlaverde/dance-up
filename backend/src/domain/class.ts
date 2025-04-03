export class Class {
  private id: string;
  private studioId: string;
  private className: string;
  private classDescription: string;

  constructor(
    id: string, studioId: string, className: string, classDescription: string
  ) {
    this.id = id;
    this.studioId = studioId;
    this.className = className;
    this.classDescription = classDescription;
  }

  getId() {
    return this.id;
  }

  getStudioId() {
    return this.studioId;
  }

  getClassName() {
    return this.className;
  }

  getClassDescription() {
    return this.classDescription;
  }
}