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
}