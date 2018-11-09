import { DrupalJsonData, EntityType } from "./DrupalJson";

export class Instructor {
  constructor(name: string, field_first_name: string, field_academic_rank: string,field_academic_title: string) {
    this.name = name
    this.field_first_name = field_first_name
    this.field_academic_rank = field_academic_rank
    this.field_academic_title = field_academic_title
  }
  field_first_name: string;
  field_academic_rank: string;
  field_academic_title: string;
  name: string;
  uuid: number;
  type:string;
}