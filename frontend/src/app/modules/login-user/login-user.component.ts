import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  
  loginForm: FormGroup;
  serverErrorMessage!: string;

  constructor(private fb : FormBuilder, private loginService : LoginService, private router : Router) { 
    this.loginForm = fb.group({
      email : new FormControl(null,[Validators.email, Validators.required]),
      password : new FormControl(null,Validators.required)
    });
  }

  ngOnInit(): void {
    if(!this.loginService.isLoggedIn()){
      localStorage.removeItem('token');
    }
  }

  login(){
    if(!this.loginForm.valid){
      this.serverErrorMessage ="Please enter Email and Password";
      return;
    }
    var loginDetails = new Login();
    loginDetails = this.loginForm.value;
    this.loginService.login(loginDetails).subscribe(
      (res : any) => {
        this.loginService.setToken(res);
        this.refresh();
      },
        error => {
          this.serverErrorMessage = error.error.message;
        }
    );
  }

  refresh(){
    if(localStorage.getItem('designation') == 'Admin' || localStorage.getItem('designation') == 'Super Admin'){
      this.router.navigate(['dashboard'])
   .then(() => {
      window.location.reload();
    });
    }else {
      this.router.navigate(['center'])
      .then(() => {
        window.location.reload();
      });
    }
    
  }

}
