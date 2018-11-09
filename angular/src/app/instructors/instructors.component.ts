import { Component, OnInit } from '@angular/core';
import { UniversityService } from '../services/university.service';
import { Instructor } from '../models/Instructor';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css']
})
export class InstructorsComponent implements OnInit {

  constructor(private universityService: UniversityService) { }
  private instructors: Array<Instructor>
  ngOnInit() {
    this.getInstructors()
  }
  private getInstructors(): void  {
    this.universityService.getInstructors().then((res) => {
      this.instructors = res.data.data
    })
  }

}
