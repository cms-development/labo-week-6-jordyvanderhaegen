import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UniversityService } from '../services/university.service';
import { Course } from '../models/Course';
import { DrupalJsonData, DrupalJson } from '../models/DrupalJson';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  constructor(private universityService: UniversityService, private route: ActivatedRoute, private router: Router) { }

  private id: string
  private drupalJsonData: DrupalJsonData
  private course: Course
  private students: Array<DrupalJsonData> = []
  private instructors: Array<DrupalJsonData> = []
  private des: JSON
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getCourse()
  }

  private getCourse() {
    this.universityService.getCourse(this.id).then((res) => {
      const { data, included } = res.data
      this.drupalJsonData = data
      this.course = this.drupalJsonData.attributes
      this.students = this.universityService.filterIncluded('student--student', included)
      this.instructors = this.universityService.filterIncluded('instructor--instructor', included)
    })
  }
  private onDelete() {
    this.universityService.deleteCourse(this.id).then((res) => {
      this.router.navigate(['courses'])
    })
  }

}
