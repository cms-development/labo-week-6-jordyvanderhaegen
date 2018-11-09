import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UniversityService } from '../services/university.service';
import { Instructor } from '../models/Instructor';

@Component({
  selector: 'app-instructor-detail',
  templateUrl: './instructor-detail.component.html',
  styleUrls: ['./instructor-detail.component.css']
})
export class InstructorDetailComponent implements OnInit {

  constructor(private universityService: UniversityService, private route: ActivatedRoute, private router: Router) { }
  
  private id : string
  private instructor: Instructor

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getInstructor()
  }

  private getInstructor() {
    this.universityService.getInstructor(this.id).then((res) => {
      this.instructor = res.data.data
      console.log(this.instructor)
    })
  }
  private onDelete() {
    this.universityService.deleteInstructor(this.id).then((res) => {
      this.router.navigate(['instructors'])
    })
  }

}
