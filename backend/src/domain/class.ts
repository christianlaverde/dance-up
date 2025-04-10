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

export enum RECURRENCE_FREQUENCY {
  WEEKLY = 'weekly',
  BIWEEKLY = 'biweekly',
  MONTHLY = 'monthly'
}

export class Class {

   constructor(
    private id: string,
    private name: string,
    private description: string,
    private day: DAY_OF_WEEK
   ) { };

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