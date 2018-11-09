import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../services/university.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../models/Course';
import { Student } from '../models/Students';
import { Instructor } from '../models/Instructor';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { DrupalJsonData, DrupalJson } from '../models/DrupalJson';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  constructor(private universityService: UniversityService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) { }
  private id: string
  private course: Course
  private students: Array<Student>
  private instructors: Array<Instructor>
  private form: FormGroup
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.getCourse()
  }
  private getCourse() {
    this.universityService.getCourse(this.id).then((res) => {
      const { data, included } = res.data
      this.course = data.attributes
      this.universityService.getStudents().then((resin) => {
        this.students = resin.data.data
        const studentControls = this.students.map(c => new FormControl(false));
        this.universityService.getInstructors().then((reswithin) => {
          this.instructors = reswithin.data.data
          const instructorControls = this.instructors.map(c => new FormControl(false));
          this.form = this.formBuilder.group({
            students: new FormArray(studentControls),
            instructors: new FormArray(instructorControls),
            name: new FormControl(this.course.name),
            academic_institution: new FormControl(this.course.field_academic_institution)
          })
        }).catch((err) => console.log(err))
      }).catch((err) => console.log(err))
    }).catch((err) => {
       console.log(err)
    })
  }
  private onSubmit() {
    const { academic_institution, name, students, instructors } = this.form.value
    const selectedStudents = students.map((v, i) => v ? this.students[i] : null).filter(v => v !== null);
    const selectedInstructors = instructors.map((v, i) => v ? this.instructors[i] : null).filter(v => v !== null);
    let course = new Course(name, academic_institution)
    let drupalJsonData = new DrupalJsonData('course--course', course, { field_students: { data: selectedStudents }, field_instructor: { data: selectedInstructors} })
    drupalJsonData.id = this.id
    let drupalJson = new DrupalJson(drupalJsonData);
    this.universityService.patchCourse(drupalJson, this.id).then((data) => {
      this.router.navigate([`course/${data.data.data.id}`])
    }).catch((err) => {
      console.log(err)
    })
  }

}
