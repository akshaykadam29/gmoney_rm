import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/models/application';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { LoginService } from 'src/app/services/login.service';
import { RmUserService } from 'src/app/services/rm-user.service';

@Component({
  selector: 'app-loan-rejected',
  templateUrl: './loan-rejected.component.html',
  styleUrls: ['./loan-rejected.component.css']
})
export class LoanRejectedComponent implements OnInit {
  applicationResponseList! : Application[];
  returnStatus : any;
  appRejectRemark : any;
  hierarchy : boolean = false;
  allDirectReportee! : any[];
  allChildReportee! : any[];

  constructor(private loginService : LoginService, private rmservice : RmUserService, private adminService : AdminServiceService) { }

  ngOnInit(): void {
    const tab : string = 'rejected';
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

getApplicationRejectStatus(reject_remarks : any){
  this.appRejectRemark = "";
  if(reject_remarks.low_income == true ){
    if(this.appRejectRemark == ""){
      this.appRejectRemark =  "Low Income";
    }
    else{
      this.appRejectRemark =  this.appRejectRemark + "," + "Low Income";
    }
  }
  if(reject_remarks.low_cibil == true ){
    if(this.appRejectRemark == ""){
      this.appRejectRemark =  "Low Cibil";
    }
    else{
      this.appRejectRemark =  this.appRejectRemark + "," + "Low Cibil";
    }
  }
  if(reject_remarks.overleveraged == true ){
    if(this.appRejectRemark == ""){
      this.appRejectRemark =  "OverLeveraged";
    }
    else{
      this.appRejectRemark =  this.appRejectRemark + "," + "OverLeveraged";
    }
  }
  if(reject_remarks.negative_pincode == true ){
    if(this.appRejectRemark == ""){
      this.appRejectRemark =  "Negative Pincode";
    }
    else{
      this.appRejectRemark =  this.appRejectRemark + "," + "Negative Pincode";
    }
  }
  if(reject_remarks.abb_below_emi == true ){
    if(this.appRejectRemark == ""){
      this.appRejectRemark =  "ABB below EMI";
    }
    else{
      this.appRejectRemark =  this.appRejectRemark + "," + "ABB below EMI";
    }
  }
  if(reject_remarks.fraud_match == true ){
    if(this.appRejectRemark == ""){
      this.appRejectRemark =  "Auto System Declined";
    }
    else{
      this.appRejectRemark =  this.appRejectRemark + "," + "Auto System Declined";
    }
  }
  if(reject_remarks.bounce == true ){
    if(this.appRejectRemark == ""){
      this.appRejectRemark =  "Bounces";
    }
    else{
      this.appRejectRemark =  this.appRejectRemark + "," + "Bounces";
    }
  }
  if(reject_remarks.aigo == true ){
    if(this.appRejectRemark == ""){
      this.appRejectRemark =  "Auto System Declined";
    }
    else{
      this.appRejectRemark =  this.appRejectRemark + "," + "Auto System Declined";
    }
  }
  if(reject_remarks.others == true ){
    if(this.appRejectRemark == ""){
      this.appRejectRemark =  "Auto System Declined";
    }
    else{
      this.appRejectRemark =  this.appRejectRemark + "," + "Auto System Declined";
    }
  }
  return this.appRejectRemark;
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
     this.getAllApplicationByHospId(event.target.value, "rejected");
   }
}
if(event.target.value == "All" ){
  var reporteesId= [];
  for(var i=0; i<this.allDirectReportee.length; i++){
    reporteesId.push(this.allDirectReportee[i]._id);
  }
  this.rmservice.getAllDirectReporteeApplicationById(reporteesId,"rejected").subscribe((res: any) =>{
    this.applicationResponseList = res;
  })
}
}


directChildSelected(event: any){
  if(!event.target.value == false){
    if(event.target.value != "All" ){
     this.getAllApplicationByHospId(event.target.value, "rejected");
   }
}
  if(event.target.value == "All" ){
    var reporteesId= [];
    for(var i=0; i<this.allChildReportee.length; i++){
      reporteesId.push(this.allChildReportee[i]._id);
    }
    this.rmservice.getAllDirectReporteeApplicationById(reporteesId,"rejected").subscribe((res: any) =>{
      this.applicationResponseList = res;
    })
  }
}


}