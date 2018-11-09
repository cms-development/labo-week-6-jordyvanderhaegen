import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Instructor } from '../models/Instructor';
import { DrupalJsonData, DrupalJson } from '../models/DrupalJson';
import { UniversityService } from '../services/university.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-instructor',
  templateUrl: './create-instructor.component.html',
  styleUrls: ['./create-instructor.component.css']
})
export class CreateInstructorComponent implements OnInit {

  private form: FormGroup
  academic_ranks = [
    { id: 'rank_0', name: 'Visiting Professor' },
    { id: 'rank_1', name: 'Assistant Lecturer' },
    { id: 'rank_2', name: 'Senior Assistant Lecturer' },
    { id: 'rank_3', name: 'Lecturer' },
    { id: 'rank_4', name: 'Senior Lecturer' }
  ];
  academic_titles = [
    { id: 'title_5-0', name: 'A.D.' },
    { id: 'title_6-0', name: 'B.' },
    { id: 'title_6-1', name: 'B.A.' },
    { id: 'title_6-2', name: 'B.Sc.' },
    { id: 'title_7-0', name: 'M.' },
    { id: 'title_7-1', name: 'M.A.' },
    { id: 'title_7-2', name: 'M.Sc' }
  ];
  constructor(private formBuilder: FormBuilder, private universityService: UniversityService, private router: Router) {
    this.form = this.formBuilder.group({
      academic_rank: new FormControl(),
      academic_title: new FormControl(),
      name: new FormControl(),
      first_name: new FormControl()
    })
  }

  ngOnInit() {
    
  }
  private onSubmit() {
    const { first_name, name, academic_rank, academic_title } = this.form.value
    let student = new Instructor(name, first_name, academic_rank, academic_title)
    let drupalJsonData = new DrupalJsonData('instructor--instructor', student)
    let drupalJson = new DrupalJson(drupalJsonData);
    this.universityService.setInstructor(drupalJson).then((data) => {
      this.router.navigate([`instructor/${data.data.data.id}`])
    }).catch((err) => {
      console.log(err)
    })
  }
}
