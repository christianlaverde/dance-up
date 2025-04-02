export class Class {
  private className: string;
  private classDescription: string;

  constructor(
    id: string, studioId: string, className: string, classDescription: string
  ) {
    this.className = className;
    this.classDescription = classDescription;
  }
}