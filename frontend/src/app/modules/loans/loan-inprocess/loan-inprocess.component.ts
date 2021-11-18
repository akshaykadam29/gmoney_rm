import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/models/application';
import { AppStatus } from 'src/app/models/appStatus';
import { ApplicationStatus } from 'src/app/models/applicationStatus';
import { LoginService } from 'src/app/services/login.service';
import { RmUserService } from 'src/app/services/rm-user.service';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-loan-inprocess',
  templateUrl: './loan-inprocess.component.html',
  styleUrls: ['./loan-inprocess.component.css']
})
export class LoanInprocessComponent implements OnInit {
  applicationResponseList! : Application[];
  returnStatus : any;
  applicationRemarks : string ='';
  hierarchy : boolean = false;
  allDirectReportee! : any[];
  allChildReportee! : any[];

  constructor(private rmservice : RmUserService, private loginService : LoginService, private adminService : AdminServiceService) { }

  ngOnInit(): void {
    const tab : string = 'inProcess';
    var token = this.loginService.getUserPayload();
    if(token !=null){
      var id = token._id;
      this.getAllApplicationByHospId(id, tab);
      var user = this.loginService.getUser();
      this.getDirectReportee(id);
    }
  }

  getAllApplicationByHospId(id: any, tab : string){
    this.rmservice.getAllApplicationByHospId(id, tab).subscribe((res : any) => {
      this.applicationResponseList = res;
    });
  }

  getDirectReportee(id : any){
    this.adminService.getDirectReportee(id).subscribe((res : any) => {
      this.allDirectReportee = res.results;
    })
  }

  directRepSelected(event : any){
    if(!event.target.value == false){
      if(event.target.value != "All" ){
       this.adminService.getDirectReportee(event.target.value).subscribe((res : any) => {
             this.allChildReportee = res.results;
          });
       this.getAllApplicationByHospId(event.target.value, "inProcess");
     }
  }
  if(event.target.value == "All" ){
    var reporteesId= [];
    for(var i=0; i<this.allDirectReportee.length; i++){
      reporteesId.push(this.allDirectReportee[i]._id);
    }
    this.rmservice.getAllDirectReporteeApplicationById(reporteesId,"inProcess").subscribe((res: any) =>{
      this.applicationResponseList = res;
    })
  }
}


  directChildSelected(event: any){
    if(!event.target.value == false){
      if(event.target.value != "All" ){
       this.getAllApplicationByHospId(event.target.value, "inProcess");
     }
 }
    if(event.target.value == "All" ){
      var reporteesId= [];
      for(var i=0; i<this.allChildReportee.length; i++){
        reporteesId.push(this.allChildReportee[i]._id);
      }
      this.rmservice.getAllDirectReporteeApplicationById(reporteesId,"inProcess").subscribe((res: any) =>{
        this.applicationResponseList = res;
      })
    }
  }

}
