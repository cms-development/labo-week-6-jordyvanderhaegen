import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { Routes, RouterModule } from '@angular/router'
import { StudentsComponent } from './students/students.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { InstructorsComponent } from './instructors/instructors.component';
import { InstructorDetailComponent } from './instructor-detail/instructor-detail.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { LoginComponent } from './login/login.component';
import { CreateInstructorComponent } from './create-instructor/create-instructor.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { EditInstructorComponent } from './edit-instructor/edit-instructor.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'course/create', component: CreateCourseComponent },
  { path: 'course/edit/:id', component: EditCourseComponent },
  { path: 'course/:id', component: CourseDetailComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'student/create', component: CreateStudentComponent },
  { path: 'student/edit/:id', component: EditStudentComponent },
  { path: 'student/:id', component: StudentDetailComponent },
  { path: 'instructors', component: InstructorsComponent },
  { path: 'instructor/edit/:id', component: EditInstructorComponent },
  { path: 'instructor/create', component: CreateInstructorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'instructor/:id', component: InstructorDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports : [
    RouterModule
  ]
})
export class AppRoutingModule { }
