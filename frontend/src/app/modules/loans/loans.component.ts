import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/models/application';
import { LoginService } from 'src/app/services/login.service';
import { RmUserService } from 'src/app/services/rm-user.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {

  count1 : Number= 0;
  count2 : Number= 0;
  count3 : Number= 0;
  count4 : Number = 0;
  component : string = 'inprocess';
  applicationDataList! : Application[];

  constructor(private loginService : LoginService, private rmservice : RmUserService) { }

  ngOnInit(): void {
    const tab : string = 'inProcess';
    var tabArray  = ['inProcess', 'rejected', 'approved', 'disbursed'];
    var token = this.loginService.getUserPayload();
    if(token !=null){
      var id = token._id;
      for(var i=0;i<4;i++){
        this.getAllApplicationByHospId(id,tabArray[i]);
      }
    }
  }

  getAllApplicationByHospId(id: any, tab : string){
      this.rmservice.getAllApplicationByHospId(id, tab).subscribe((res : any) => {
        if(tab == 'inProcess'){
          this.count1 = res.length;
        }
        if(tab == 'rejected'){
          this.count2 = res.length;
        }
        if(tab == 'approved'){
          this.count3 = res.length;
        }
        if(tab == 'disbursed'){
          this.count4 = res.length;
        }
    });
  }

  ScreenNaviagte(componentNumber : any){
    if(componentNumber== 1){
      this.component = "inprocess";
    }
    else if(componentNumber == 2){
      this.component = "rejected"
    }
    else if(componentNumber == 3){
      this.component = "approved"
    }
    else if(componentNumber == 4){
      this.component = "disbursed"
    }
  }
}
