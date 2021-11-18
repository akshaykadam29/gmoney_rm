import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { LoginService } from 'src/app/services/login.service';
import { RmUserService } from 'src/app/services/rm-user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ImageViewDialogComponent } from '../../dialog/image-view-dialog/image-view-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-centre-onhold',
  templateUrl: './centre-onhold.component.html',
  styleUrls: ['./centre-onhold.component.css']
})
export class CentreOnholdComponent implements OnInit {
  hospitalResponseList! : Hospital[];
  selectedFile! : File ;
  hierarchy : boolean = false;
  allDirectReportee! : any[];
  allChildReportee! : any[];
  fileName! : any;
  fileArray! : FileList;
  
  constructor(private rmservice : RmUserService, private loginService : LoginService,private matDialog : MatDialog,private router : Router, private adminService : AdminServiceService) { }

  ngOnInit(): void {
    const tab : Number = 2;
    var token = this.loginService.getUserPayload();
    if(token !=null){
      var id = token._id;
      this.getAllAssignedHopitalById(id, tab);
      var user = this.loginService.getUser();
      this.getDirectReportee(id);
    }
  }

  getAllAssignedHopitalById(id: any, tab : Number){
    this.rmservice.getAllAssignedHopitalById(id, tab).subscribe((res : any) => {
      this.hospitalResponseList = res;
    });
  }

  getContactName(contName : any,dirName : any){
    if(contName != ''){
      return contName;
    }
    else{
      return dirName;
    }
  }

  getContactNum(contNum : any,dirNum : any){
    if(contNum != ''){
      return contNum;
    }
    else{
      return dirNum;
    }
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
        this.getAllAssignedHopitalById(event.target.value, 2);
      }
      if(event.target.value == "All" ){
        var reporteesId= [];
        for(var i=0; i<this.allDirectReportee.length; i++){
          reporteesId.push(this.allDirectReportee[i]._id);
        }
        this.rmservice.getAllDirectReporteeHospitalById(reporteesId,2).subscribe((res: any) =>{
          this.hospitalResponseList = res.results;
        })
      }
    }
  }

  directChildSelected(event: any){
     if(!event.target.value == false){
       if(event.target.value != "All" ){
        this.getAllAssignedHopitalById(event.target.value, 2);
      }
  }
  if(event.target.value == "All" ){
    var reporteesId= [];
    for(var i=0; i<this.allChildReportee.length; i++){
      reporteesId.push(this.allChildReportee[i]._id);
    }
    this.rmservice.getAllDirectReporteeHospitalById(reporteesId,2).subscribe((res: any) =>{
      this.hospitalResponseList = res.results;
    })
  }
}

onFileSelected(event : any, index : any, hid : any, h_id : any){
  this.hospitalResponseList[index].fileSelected = ` ${event.target.files.length} file Selected`;
  
  if(event.target.files){
    this.fileArray = event.target.files;
    const formData = new FormData();
    for (let i = 0; i < this.fileArray.length; i++) {
      formData.append(`${i}`, this.fileArray[i]);
    }
    formData.append("hid", hid);
    formData.append("count", (this.fileArray.length).toString());
    formData.append("h_id", h_id);
    this.rmservice.uploadImageToS3(formData).subscribe((res: any) => {
      this.hospitalResponseList[index].uploadButton = true;
      this.reloadCurrentRoute();
    })
  }  
}

viewFileinDialog(imageId : any){ 
  this.matDialog.open(ImageViewDialogComponent,{
    height: '400px',
    width: '500px',
    data : {
      centerBrandId : imageId,
      disableClose : true,
      autoFocus : true
    }
  });
}

reloadCurrentRoute() {
  let currentUrl = this.router.url;
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
  });
}


}
