import { Course } from "./Course";
import { Instructor } from "./Instructor";
import { Student } from "./Students";

export class DrupalJson {
  constructor(data: DrupalJsonData) {
    this.data = data
  }
  data: any
  included: Array<DrupalJsonData>
  relationships: any
}

export class DrupalJsonData{
  constructor(type: string, attributes: any, relationships?: any) {
    this.type = type
    this.attributes = attributes
    this.relationships = relationships
  }
  type: string;
  id: string;
  attributes: any
  relationships: any = {}
}

export type EntityType = Course | Student | Instructor

