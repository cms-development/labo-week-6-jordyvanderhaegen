import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../services/university.service';
import { Course } from '../models/Course';
import { DrupalJsonData } from '../models/DrupalJson';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(private _universityService: UniversityService) { }
  private courses: Array<DrupalJsonData>
  ngOnInit() {
    this.getCourses()
  }

  private getCourses() {
    this._universityService.getCourses().then((res) => {
      this.courses = res.data.data
    }).catch((err) => console.log(err));
  }

}
