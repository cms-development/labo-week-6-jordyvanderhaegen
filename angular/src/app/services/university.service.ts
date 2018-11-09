import { Injectable } from '@angular/core';
import axios from 'axios';
import { AxiosInstance, AxiosResponse } from 'axios'
import { environment } from '../../environments/environment';
import { DrupalJson, EntityType, DrupalJsonData } from '../models/DrupalJson';
import { Course } from '../models/Course';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  private axiosClient: AxiosInstance
  constructor(private authService: AuthService) { 
    this.axiosClient = axios.create();
    this.axiosClient.interceptors.request.use(
      config => {
        config.headers.Authorization = `Bearer ${this.authService.getToken()}`
        return config
      })
  }
  private _apiEndPointCourses = `${environment.drupalApi.url}${environment.drupalApi.jsonurl}${environment.drupalApi.endPoints.course.url}`
  private _apiEndPointStudents = `${environment.drupalApi.url}${environment.drupalApi.jsonurl}${environment.drupalApi.endPoints.student.url}`
  private _apiEndPointInstructors = `${environment.drupalApi.url}${environment.drupalApi.jsonurl}${environment.drupalApi.endPoints.instructor.url}`
  
  public getCourses(): Promise<AxiosResponse<DrupalJson>> {
    return new Promise((res,rej) => {
      this.axiosClient.get(`${this._apiEndPointCourses}?include=user_id`)
      .then((data) => {
        res(data)
      })
      .catch((err) => {
        rej(err)
      })
    })
  }

  public getStudents(): Promise<AxiosResponse<DrupalJson>> {
    return new Promise((res,rej) => {
      this.axiosClient.get(`${this._apiEndPointStudents}?include=user_id`)
      .then((data) => {
        res(data)
      })
      .catch((err) => {
        rej(err)
      })
    })
  }

  public getStudent(id: string): Promise<AxiosResponse<DrupalJson>> {
    return new Promise((res,rej) => {
      this.axiosClient.get(`${this._apiEndPointStudents}/${id}?include=field_courses`)
      .then((data) => {
        res(data)
      })
      .catch((err) => {
        rej(err)
      })
    })
  }
  public getCourse(id: string): Promise<AxiosResponse<DrupalJson>> {
    return new Promise((res,rej) => {
      this.axiosClient.get(`${this._apiEndPointCourses}/${id}?include=user_id,field_instructor,field_students`)
      .then((data) => {
        res(data)
      })
      .catch((err) => {
        rej(err)
      })
    })
  }
  public getInstructors(): Promise<AxiosResponse<DrupalJson>> {
    return new Promise((res,rej) => {
      this.axiosClient.get(`${this._apiEndPointInstructors}?include=user_id`)
      .then((data) => {
        res(data)
      })
      .catch((err) => {
        rej(err)
      })
    })
  }
  public getInstructor(id: string): Promise<AxiosResponse<DrupalJson>> {
    return new Promise((res,rej) => {
      this.axiosClient.get(`${this._apiEndPointInstructors}/${id}?include=user_id`)
      .then((data) => {
        res(data)
      })
      .catch((err) => {
        rej(err)
      })
    })
  }
  public setStudent(drupalJson: DrupalJson):  Promise<AxiosResponse<DrupalJson>> {
    return new Promise((res,rej) => {
      this.axiosClient.post(this._apiEndPointStudents, drupalJson)
      .then((data) =>{
        res(data)
      })
      .catch((err) => {
        console.log(err)
      })
    })
  }
  public setInstructor(drupalJson: DrupalJson):  Promise<AxiosResponse<DrupalJson>> {
    return new Promise((res,rej) => {
      this.axiosClient.post(this._apiEndPointInstructors, drupalJson)
      .then((data) =>{
        res(data)
      })
      .catch((err) => {
        console.log(err)
      })
    })
  }
  public setCourse(drupalJson: DrupalJson):  Promise<AxiosResponse<DrupalJson>> {
    return new Promise((res,rej) => {
      this.axiosClient.post(this._apiEndPointCourses, drupalJson)
      .then((data) =>{
        res(data)
      })
      .catch((err) => {
        console.log(err)
      })
    })
  }
  public patchStudent(drupalJson: DrupalJson, id: string):  Promise<AxiosResponse<DrupalJson>> {
    return new Promise((res,rej) => {
      this.axiosClient.patch(`${this._apiEndPointStudents}/${id}`, drupalJson)
      .then((data) =>{
        res(data)
      })
      .catch((err) => {
        console.log(err)
      })
    })
  }
  public patchInstructor(drupalJson: DrupalJson, id: string):  Promise<AxiosResponse<DrupalJson>> {
    return new Promise((res,rej) => {
      this.axiosClient.patch(`${this._apiEndPointInstructors}/${id}`, drupalJson)
      .then((data) =>{
        res(data)
      })
      .catch((err) => {
        console.log(err)
      })
    })
  }
  public patchCourse(drupalJson: DrupalJson, id: string):  Promise<AxiosResponse<DrupalJson>> {
    return new Promise((res,rej) => {
      this.axiosClient.patch(`${this._apiEndPointCourses}/${id}`, drupalJson)
      .then((data) =>{
        res(data)
      })
      .catch((err) => {
        console.log(err)
      })
    })
  }
  public deleteCourse(id: string):  Promise<AxiosResponse<DrupalJson>> {
    return new Promise((res,rej) => {
      this.axiosClient.delete(`${this._apiEndPointCourses}/${id}`)
      .then((data) =>{
        res(data)
      })
      .catch((err) => {
        console.log(err)
      })
    })
  }
  public deleteInstructor(id: string):  Promise<AxiosResponse<DrupalJson>> {
    return new Promise((res,rej) => {
      this.axiosClient.delete(`${this._apiEndPointInstructors}/${id}`)
      .then((data) =>{
        res(data)
      })
      .catch((err) => {
        console.log(err)
      })
    })
  }
  public deleteStudent(id: string):  Promise<AxiosResponse<DrupalJson>> {
    return new Promise((res,rej) => {
      this.axiosClient.delete(`${this._apiEndPointStudents}/${id}`)
      .then((data) =>{
        res(data)
      })
      .catch((err) => {
        console.log(err)
      })
    })
  }
  public filterIncluded(type: string, res: Array<DrupalJsonData>): Array<DrupalJsonData> {
      return res.filter((x) => {
        return x.type == type
      })
    
  }
}
