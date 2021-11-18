import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { RmUserService } from 'src/app/services/rm-user.service';

@Component({
  selector: 'app-claim-hospital',
  templateUrl: './claim-hospital.component.html',
  styleUrls: ['./claim-hospital.component.css']
})
export class ClaimHospitalComponent implements OnInit {

  count1 = 0;
  count2 = 0;
  count3 = 0;
  count4 = 0;
  component;
  rmUserId = '';
  userType : boolean;

  constructor(private rmUserService : RmUserService, private loginService : LoginService) {
    this.userType = localStorage.getItem('designation') == 'User';
    var token = this.loginService.getUserPayload();
      if(token != null){
        this.rmUserId = token._id;
        //Api calls to get Count for the Tabs
        this.rmUserService.getAllUnClaimedHospitalsCount().subscribe((res : any) => {
          this.count1 = res.results;
        });
        this.rmUserService.getAllClaimedHospitalsCount().subscribe((res : any) => {
          this.count2 = res.results;
        });
        this.rmUserService.getAllClaimedHospitalsCountByRmId(this.rmUserId).subscribe((res : any) => {
          this.count3 = res.results;
        });
        this.rmUserService.getAllSchemeApprovalPendingcount().subscribe((res : any) => {
          this.count4 = res.results;
        })

      if(localStorage.getItem('componentValue') == ""){
        this.component = 'new';
        localStorage.setItem('componentValue', 'new');
      }
      else{        
          this.component = localStorage.getItem('componentValue')
      }
      }
   }

  ngOnInit(): void {
  }

  ScreenNaviagte(componentNumber : any){
    if(componentNumber == 1){
      this.component = 'new';
    }
    else if(componentNumber == 2){
      this.component = 'claimed';
    }
    else if(componentNumber == 3){
      this.component = 'myclaimed';
    }
    else if(componentNumber == 4){
      this.component = 'approval'
    }
  }
}
