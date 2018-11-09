import { DrupalJsonData, EntityType } from "./DrupalJson";

export class Student {
  constructor(name: string, field_first_name: string) {
    this.name = name
    this.field_first_name = field_first_name
  }
  name: string;
  uuid: number;
  type: string;
  field_first_name: string
}