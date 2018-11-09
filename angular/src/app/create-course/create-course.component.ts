import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../services/university.service';
import { Student } from '../models/Students';
import { Instructor } from '../models/Instructor';
import { FormControl, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { DrupalJson, DrupalJsonData } from '../models/DrupalJson';
import { Course } from '../models/Course';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  constructor(private universityService: UniversityService, private formBuilder: FormBuilder, private router: Router) { }

  private students: Array<Student>
  private instructors: Array<Instructor>
  private form: FormGroup
  ngOnInit() {
    this.getStudents()
  }
  private getStudents() {
    this.universityService.getStudents().then((res) => {
      this.students = res.data.data
      const studentControls = this.students.map(c => new FormControl(false));
      this.universityService.getInstructors().then((resin) => {
        this.instructors = resin.data.data
        const instructorControls = this.instructors.map(c => new FormControl(false));
        this.form = this.formBuilder.group({
          students: new FormArray(studentControls),
          instructors: new FormArray(instructorControls),
          name: new FormControl(),
          academic_institution: new FormControl()
        })
      })
    })
  }

  private onSubmit() {
    const { academic_institution, name, students, instructors } = this.form.value
    const selectedStudents = students.map((v, i) => v ? this.students[i] : null).filter(v => v !== null);
    const selectedInstructors = instructors.map((v, i) => v ? this.instructors[i] : null).filter(v => v !== null);
    let student = new Course(name, academic_institution)
    let drupalJsonData = new DrupalJsonData('course--course', student, { field_students: { data: selectedStudents }, field_instructor: { data: selectedInstructors} })
    let drupalJson = new DrupalJson(drupalJsonData);
    this.universityService.setCourse(drupalJson).then((data) => {
      this.router.navigate([`course/${data.data.data.id}`])
    }).catch((err) => {
      console.log(err)
    })
  }


}
