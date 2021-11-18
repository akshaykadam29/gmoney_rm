import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/models/application';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { LoginService } from 'src/app/services/login.service';
import { RmUserService } from 'src/app/services/rm-user.service';

@Component({
  selector: 'app-loan-disbursed',
  templateUrl: './loan-disbursed.component.html',
  styleUrls: ['./loan-disbursed.component.css']
})
export class LoanDisbursedComponent implements OnInit {
  applicationResponseList! : Application[];
  hierarchy : boolean = false;
  allDirectReportee! : any[];
  allChildReportee! : any[];

  constructor(private loginService : LoginService, private rmservice : RmUserService, private adminService : AdminServiceService) { }

  ngOnInit(): void {
    const tab : string = 'disbursed';
    var token = this.loginService.getUserPayload();
    if(token !=null){
      var id = token._id;
      this.getAllApplicationByHospId(id,tab);
      var user = this.loginService.getUser();
      this.getDirectReportee(id);
    }
  }
  getAllApplicationByHospId(id: any,tab :string){
    this.rmservice.getAllApplicationByHospId(id,tab).subscribe((res : any) => {
      this.applicationResponseList = res;
    });
  }

  getAdvanceEMI(adv : any, emi : any){
    return (adv * emi);
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
       this.getAllApplicationByHospId(event.target.value, "disbursed");
     }
  }
  if(event.target.value == "All" ){
    var reporteesId= [];
    for(var i=0; i<this.allDirectReportee.length; i++){
      reporteesId.push(this.allDirectReportee[i]._id);
    }
    this.rmservice.getAllDirectReporteeApplicationById(reporteesId,"disbursed").subscribe((res: any) =>{
      this.applicationResponseList = res;
    })
  }
}


  directChildSelected(event: any){
    if(!event.target.value == false){
      if(event.target.value != "All" ){
       this.getAllApplicationByHospId(event.target.value, "disbursed");
     }
 }
    if(event.target.value == "All" ){
      var reporteesId= [];
      for(var i=0; i<this.allChildReportee.length; i++){
        reporteesId.push(this.allChildReportee[i]._id);
      }
      this.rmservice.getAllDirectReporteeApplicationById(reporteesId,"disbursed").subscribe((res: any) =>{
        this.applicationResponseList = res;
      })
    }
  }

}
