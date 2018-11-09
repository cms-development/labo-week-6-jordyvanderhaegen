import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../services/university.service';
import { Course } from '../models/Course';
import { Student } from '../models/Students';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { DrupalJson, DrupalJsonData } from '../models/DrupalJson';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  constructor(private universityService: UniversityService, private formBuilder: FormBuilder, private router: Router) {
  }
  private form: FormGroup
  private courses: Array<Course>
  ngOnInit() {
    this.getCourses()
  }
  private getCourses() {
    this.universityService.getCourses().then((res) => {
      this.courses = res.data.data
      const controls = this.courses.map(c => new FormControl(false));
      this.form = this.formBuilder.group({
        courses: new FormArray(controls),
        name: new FormControl(),
        first_name: new FormControl()
      })
    })
  }

  private onSubmit() {
    const { first_name, name, courses } = this.form.value
    const selectedCourses = courses.map((v, i) => v ? this.courses[i] : null).filter(v => v !== null);
    let student = new Student(name, first_name)
    let drupalJsonData = new DrupalJsonData('student--student', student, { field_courses: { data: selectedCourses } })
    let drupalJson = new DrupalJson(drupalJsonData);
    this.universityService.setStudent(drupalJson).then((data) => {
      this.router.navigate([`student/${data.data.data.id}`])
    }).catch((err) => {
      console.log(err)
    })
  }

}
