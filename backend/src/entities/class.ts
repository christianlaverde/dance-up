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

  getId(): string {
    return this.id;
  }

  setId(id: string): void {
    this.id = id;
  }

  getStudioId(): string {
    return this.studioId;
  }

  setStudioId(studioId: string): void {
    this.studioId = studioId;
  }

  getClassName(): string {
    return this.className;
  }

  setClassName(className: string): void {
    this.className = className;
  }

  getClassDescription(): string {
    return this.classDescription;
  }

  setClassDescription(classDescription: string): void {
    this.classDescription = classDescription;
  }
}