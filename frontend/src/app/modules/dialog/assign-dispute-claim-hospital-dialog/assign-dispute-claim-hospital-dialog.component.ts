import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { RmUserService } from 'src/app/services/rm-user.service';

@Component({
  selector: 'app-assign-dispute-claim-hospital-dialog',
  templateUrl: './assign-dispute-claim-hospital-dialog.component.html',
  styleUrls: ['./assign-dispute-claim-hospital-dialog.component.css']
})
export class AssignDisputeClaimHospitalDialogComponent implements OnInit {

  UserResData! : any[];
  userNoRecord = "No";
  selectedValue = "";
  assignFormData: FormGroup;

  constructor(private adminService : AdminServiceService,private fb : FormBuilder, private rmUserService : RmUserService,@Inject(MAT_DIALOG_DATA) public data: any, private router : Router,public dialogRef: MatDialogRef<AssignDisputeClaimHospitalDialogComponent>) {
    this.assignFormData = fb.group({
      userId : new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  
  userInput(input :any){
    let UserData;
    var inputText = '';
    inputText = input.value;

   if(inputText.length<3){
    this.UserResData = [];
    this.userNoRecord = "No";
   }
    if(inputText.length >= 3){
      this.adminService.getUserByText(inputText).subscribe((response : any) => {
          if(response.results == "No Data Found"){
            this.UserResData = [];
            this.userNoRecord = "Yes";
          }else{
            this.UserResData = [];
            this.userNoRecord= "No"
            for(var i=0; i<response.results.length; i++){
              UserData= {
                "_id" : response.results[i]._id,
                "user" : response.results[i].name + ", " + response.results[i].city
              }
              this.UserResData.push(UserData);
            }
          }
      });
    }
  }

  userSelected(e : any) {
    this.selectedValue = e.target.options[e.target.options.selectedIndex].text;
    console.log(this.selectedValue)
    this.UserResData=[];
  }

  assignCenter(){
    this.rmUserService.updateHospitalClaimDispute(this.assignFormData.value,this.data.hospitalId).subscribe((res : any)=>{
      if(res){
        this.dialogRef.close();
        this.reloadCurrentRoute();
      }
    });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);  
        localStorage.setItem('componentValue', 'claimed');
    });
  }
}
