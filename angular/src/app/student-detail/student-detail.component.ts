import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../services/university.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../models/Students';
import { Course } from '../models/Course';
import { DrupalJsonData } from '../models/DrupalJson';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  constructor(private universityService: UniversityService,private route: ActivatedRoute, private router: Router) { }
  private id: string
  private student: Student
  private courses: Array<DrupalJsonData>
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getStudent()
  }

  private getStudent(): void {
    this.universityService.getStudent(this.id).then((res) => {
      const { data, included} = res.data
      this.student = data
      this.courses = this.universityService.filterIncluded('course--course', included)
    })
  }
  private onDelete() {
    this.universityService.deleteStudent(this.id).then((res) => {
      this.router.navigate(['students'])
    })
  }

}
