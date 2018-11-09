import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../services/university.service';
import { FormControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Course } from '../models/Course';
import { ActivatedRoute, Router } from '@angular/router';
import { DrupalJson, DrupalJsonData } from '../models/DrupalJson';
import { Student } from '../models/Students';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  constructor(private universityService: UniversityService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }
  private form: FormGroup
  private courses: Array<Course>
  private student: Student
  private id: string
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.getCourses()
    this.getStudent()
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
  private getStudent() {
    this.universityService.getStudent(this.id).then((res) => {
      const { data, included } = res.data
      this.student = data.attributes
      console.log(this.student)
      this.form.controls.name.setValue(this.student.name)
      this.form.controls.first_name.setValue(this.student.field_first_name)
    })
  }

  private onSubmit() {
    const { first_name, name, courses } = this.form.value
    const selectedCourses = courses.map((v, i) => v ? this.courses[i] : null).filter(v => v !== null);
    let student = new Student(name, first_name)
    let drupalJsonData = new DrupalJsonData('student--student', student, { field_courses: { data: selectedCourses } })
    drupalJsonData.id = this.id
    let drupalJson = new DrupalJson(drupalJsonData);
    this.universityService.patchStudent(drupalJson,this.id)
    .then((res) => {
      this.router.navigate([`/student/${this.id}`])
    })
    .catch((err) => { console.log(err)})
  }

}
