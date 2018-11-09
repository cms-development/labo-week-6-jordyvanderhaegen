import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  private form: FormGroup

  constructor(private fromBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fromBuilder.group({
      email: new FormControl(),
      password: new FormControl()
    })
   }
  

  ngOnInit() {
  }
  
  private onSubmit() {
    console.log(this.form.value)
    this.authService.postLogin(this.form.value.email, this.form.value.password)
    .then((data) => { 
      localStorage.setItem('access_token', data.data.access_token)
      this.router.navigate(['/'])
    })
    .catch((err) => { console.log(err)} )
  }

}
