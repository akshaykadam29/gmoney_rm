import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  check : any = '';
  constructor(private loginService : LoginService,public router : Router) { }

  ngOnInit(): void {
    if(!this.loginService.isLoggedIn()){
      console.log("No loggedIn");
      this.router.navigateByUrl('');
    }
    
      this.check = (localStorage.getItem('designation')) ;
      console.log(this.check)
  }

  logout(){
    this.loginService.deleteToken();
    this.router.navigateByUrl('');
  }

}
