import { Component, OnInit } from '@angular/core';
import { RmUserService } from 'src/app/services/rm-user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  LoggedInUser : any;
  
  constructor(private rmUserService : RmUserService) { }
  nationalRanking : any = [];
  regionalRanking : any = [];

  ngOnInit(): void {
    this.LoggedInUser = localStorage.getItem('name');
    this.rmUserService.getLeaderByNationalRanking().subscribe((res : any) =>{
      this.nationalRanking = res;
    });
    this.rmUserService.getLeaderByRegionalRanking().subscribe((res : any) =>{
      this.regionalRanking = res;
      console.log(this.regionalRanking)
    });
  }

}
