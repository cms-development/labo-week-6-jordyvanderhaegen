import { Injectable } from '@angular/core';
import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { OAuth } from '../models/Oauth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private axiosClient: AxiosInstance
  private _apiEndPointOauth = `${environment.drupalApi.url}${environment.drupalApi.endPoints.oauth.url}${environment.drupalApi.endPoints.oauth.type.token}`;

  constructor() { 
    this.axiosClient = axios.create()
  }
  
  public postLogin(email: string, password: string): Promise<AxiosResponse<OAuth>> {
    return new Promise((res, rej) => {
      let postData = {
        grant_type: 'password',
        client_id: environment.client_id,
        client_secret: environment.client_secret,
        username: email,
        password: password
      }
      let formData = this.setAsFormData(postData)
      axios.post(this._apiEndPointOauth, formData )
      .then((data) => {
        res(data)
      })
      .catch((error: AxiosError) => {
        rej(error)
      });
    })
  }

  private setAsFormData(postData: object): FormData {
    let formData = new FormData();
    for(let key in postData) {
      formData.append(key, postData[key])
    }
    return formData;
  }
  
  public getToken(): string {
    return localStorage.getItem('access_token')
  }
}
