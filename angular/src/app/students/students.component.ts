import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../services/university.service';
import { Student } from '../models/Students';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor(private universityService: UniversityService) { }
  private students: Student
  ngOnInit() {
    this.getStudents()
  }

  private getStudents() {
    this.universityService.getStudents().then((res) => {
      this.students = res.data.data
    }).catch((err) => {
      console.log(err)
    })
  }

}
