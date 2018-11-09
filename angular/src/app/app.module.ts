import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'; 
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { AppRoutingModule } from './app-routing.module';
import { UniversityService } from './services/university.service';
import { StudentsComponent } from './students/students.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { InstructorsComponent } from './instructors/instructors.component';
import { InstructorDetailComponent } from './instructor-detail/instructor-detail.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CreateInstructorComponent } from './create-instructor/create-instructor.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { EditInstructorComponent } from './edit-instructor/edit-instructor.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    StudentsComponent,
    CourseDetailComponent,
    StudentDetailComponent,
    InstructorsComponent,
    InstructorDetailComponent,
    CreateStudentComponent,
    LoginComponent,
    CreateInstructorComponent,
    CreateCourseComponent,
    EditStudentComponent,
    EditCourseComponent,
    EditInstructorComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UniversityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
