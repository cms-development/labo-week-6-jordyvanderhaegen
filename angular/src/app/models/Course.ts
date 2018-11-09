import { DrupalJsonData, EntityType } from "./DrupalJson";

export class Course {
  constructor(name: string, field_academic_institution: string,) {
    this.name = name
    this.field_academic_institution = field_academic_institution;
  }
  name: string;
  uuid: number;
  field_academic_institution: string;
}