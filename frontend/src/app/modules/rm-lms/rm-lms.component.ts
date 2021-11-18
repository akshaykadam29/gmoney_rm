import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignLeads } from 'src/app/models/assignLeads';
import { LoginService } from 'src/app/services/login.service';
import { RmLmsService } from 'src/app/services/rm-lms.service';

@Component({
  selector: 'app-rm-lms',
  templateUrl: './rm-lms.component.html',
  styleUrls: ['./rm-lms.component.css']
})
export class RmLmsComponent implements OnInit {

  component : string = 'assigned';

  constructor() { }

  ngOnInit(): void {}

  ScreenNaviagte(componentNumber : any){
    if(componentNumber== 1){
      this.component = "appoinment";
    }
    else if(componentNumber == 2){
      this.component = "assigned"
    }
    else if(componentNumber == 3){
      this.component = "call";
    }
    else if(componentNumber == 4){
      this.component = "visit";
    }
    else if(componentNumber == 5){
      this.component = "inProcess";
    }
    else if(componentNumber == 6){
      this.component = "linkSent";
    }
    else if(componentNumber == 7){
      this.component = "onboarded";
    }
    else if(componentNumber == 8){
      this.component = "notInterested";
    }
    else if(componentNumber == 9){
      this.component = "doesntExist";
    }
    else if(componentNumber == 10){
      this.component ="addLead";
    }
    else if(componentNumber == 11){
      this.component ="marketing";
    }
  }
}
