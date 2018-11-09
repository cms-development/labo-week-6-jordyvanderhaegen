import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../services/university.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Instructor } from '../models/Instructor';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { academic_titles, academic_ranks } from '../models/Academic';
import { DrupalJsonData, DrupalJson } from '../models/DrupalJson';

@Component({
  selector: 'app-edit-instructor',
  templateUrl: './edit-instructor.component.html',
  styleUrls: ['./edit-instructor.component.css']
})
export class EditInstructorComponent implements OnInit {

  constructor(private universityService: UniversityService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) { }
  private id: string
  private instructor: Instructor
  private form: FormGroup
  private academic_titles = academic_titles
  private academic_ranks = academic_ranks

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.getInstructor()
  }

  private getInstructor() {
    this.universityService.getInstructor(this.id).then((res) => {
      const { data, included } = res.data
      this.instructor = data.attributes
      this.form = this.formBuilder.group({
        academic_rank: new FormControl(this.instructor.field_academic_rank),
        academic_title: new FormControl(this.instructor.field_academic_title),
        name: new FormControl(this.instructor.name),
        first_name: new FormControl(this.instructor.field_first_name)
      })
    }).catch((err) => { console.log(err)})
  }
  
  private onSubmit() {
    const { first_name, name, academic_rank, academic_title } = this.form.value
    let instructor = new Instructor(name, first_name, academic_rank, academic_title)
    let drupalJsonData = new DrupalJsonData('instructor--instructor', instructor)
    drupalJsonData.id = this.id
    let drupalJson = new DrupalJson(drupalJsonData);
    this.universityService.patchInstructor(drupalJson, this.id).then((data) => {
      this.router.navigate([`instructor/${data.data.data.id}`])
    }).catch((err) => {
      console.log(err)
    })
  }
}
