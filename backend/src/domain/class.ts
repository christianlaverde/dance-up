export enum DAY_OF_WEEK {
  // ISO8601 Standard
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
  SUNDAY = 7
}

export class Class {
  private id: string;
  private name: string;
  private description: string;
  private day: DAY_OF_WEEK;

  constructor(
    classId: string, className: string, classDescription: string, day: DAY_OF_WEEK
  ) {
    this.id = classId;
    this.name = className;
    this.description = classDescription;
    this.day = day;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  getDay() {
    return this.day;
  }
}