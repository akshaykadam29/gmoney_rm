import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital';
import { LoginService } from 'src/app/services/login.service';
import { RmUserService } from 'src/app/services/rm-user.service';

@Component({
  selector: 'app-centre',
  templateUrl: './centre.component.html',
  styleUrls: ['./centre.component.css']
})
export class CentreComponent implements OnInit {
  assignedhospitalsList! : Hospital[];
  component : string = 'inprocess';
  count1 : Number= 0;
  count2 : Number= 0;
  count3 : Number= 0;
  constructor(private loginService : LoginService, private rmservice : RmUserService) { }


  ngOnInit(): void {
    var tabArray = [1,2,4];
    var token = this.loginService.getUserPayload();
    if(token !=null){
      var id = token._id;
      for(var i=0;i<3;i++){
        this.getAllAssignedHopitalById(id,tabArray[i]);
      }
    }
    console.log(this.count3);
  }
    getAllAssignedHopitalById(id: any, tab : Number){
      this.rmservice.getAllAssignedHopitalById(id, tab).subscribe((res : any) => {
        if(tab == 1){
          this.count1 = res.length;
        }
        if(tab == 2){
          this.count2 = res.length;
        }
        if(tab == 4){
          this.count3 = res.length;
        }
    });
  }

  ScreenNaviagte(componentNumber : any){
    if(componentNumber== 1){
      this.component = "inprocess";
    }
    else if(componentNumber == 2){
      this.component = "onHold"
    }
    else if(componentNumber == 3){
      this.component = "approved"
    }
  }

}
