import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/models/application';
import { LoginService } from 'src/app/services/login.service';
import { RmUserService } from 'src/app/services/rm-user.service';
import { Scheme } from 'src/app/models/scheme';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-loan-approved',
  templateUrl: './loan-approved.component.html',
  styleUrls: ['./loan-approved.component.css']
})
export class LoanApprovedComponent implements OnInit {
  applicationResponseList! : Application[];
  hierarchy : boolean = false;
  allDirectReportee! : any[];
  allChildReportee! : any[];

  constructor(private loginService : LoginService, private rmservice : RmUserService, private adminService : AdminServiceService) { }

  ngOnInit(): void {
    const tab : string = 'approved';
    var token = this.loginService.getUserPayload();
    if(token !=null){
      var id = token._id;
      this.getAllApplicationByHospId(id,tab);
      var user = this.loginService.getUser();
      this.getDirectReportee(id);
    }
  }
  getAllApplicationByHospId(id: any, tab : string){
    this.rmservice.getAllApplicationByHospId(id,tab).subscribe((res : any) => {
      this.applicationResponseList = res;
      console.log(this.applicationResponseList)
    });
  }

  getEmiChecked(value : any){
    return value
  }

  getEnachChecked(value : any){
    return value;
  }
  getUndChecked(value : any){
    return value
  }
  getVkycChecked(value : any){
    if(value == 'Approved'){
      return true;
    }
    return null
  }
  getSignChecked(value : any){
    return value
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
       this.getAllApplicationByHospId(event.target.value, "approved");
     }
  }
  if(event.target.value == "All" ){
    var reporteesId= [];
    for(var i=0; i<this.allDirectReportee.length; i++){
      reporteesId.push(this.allDirectReportee[i]._id);
    }
    this.rmservice.getAllDirectReporteeApplicationById(reporteesId,"approved").subscribe((res: any) =>{
      this.applicationResponseList = res;
    })
  }
}


  directChildSelected(event: any){
    if(!event.target.value == false){
      if(event.target.value != "All" ){
       this.getAllApplicationByHospId(event.target.value, "approved");
     }
 }
    if(event.target.value == "All" ){
      var reporteesId= [];
      for(var i=0; i<this.allChildReportee.length; i++){
        reporteesId.push(this.allChildReportee[i]._id);
      }
      this.rmservice.getAllDirectReporteeApplicationById(reporteesId,"approved").subscribe((res: any) =>{
        this.applicationResponseList = res;
      })
    }
  }

  getSchemeName(scheme : any){
    var schemeValue = "--";
    if(scheme == null){
      return schemeValue;
    }else{
      schemeValue = scheme.name;
      return schemeValue 
    }
  }


}
