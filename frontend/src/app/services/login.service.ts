import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = environment.apiUrl;
  noAuthHeader = { headers : new HttpHeaders({ 'NoAuth' : 'True'})};

  constructor(private http: HttpClient) { }

  login(loginDetails : Login){
    return this.http.post(this.url + '/userLogin/login', loginDetails)
  }

  getToken(){
    return localStorage.getItem('token');
  }

  setToken(res : any){
    localStorage.setItem('token', res.token);
    localStorage.setItem('designation', res.desig);
    localStorage.setItem('name', res.name);
    localStorage.setItem('email', res.email);
    localStorage.setItem('componentValue', "");
  }

  deleteToken(){
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('designation');
    localStorage.removeItem('componentValue');
  }

  getUserPayload(){
    var token = this.getToken();
    if(token){
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }else{
      return null;
    }
  }

  isLoggedIn(){
    var userPayload = this.getUserPayload();
    if(userPayload){
      return userPayload.exp > Date.now()/1000;
    }else{
      return false;
    }
  }

  getLoggedInUserProfile(){
    return this.http.get(this.url + '/userLogin/getUserProfile');
  }

  getUser(){
    return localStorage.getItem('designation');
  }
}
