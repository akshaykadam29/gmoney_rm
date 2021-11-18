import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AddDesignation } from 'src/app/models/addDesignation';
import { AddUser } from 'src/app/models/addUser';
import { AssignHospital } from 'src/app/models/assignHospital';
import { Hospital } from 'src/app/models/hospital';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { CenterAssignDataSource } from '../center-assign-datasource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-all-hospital',
  templateUrl: './all-hospital.component.html',
  styleUrls: ['./all-hospital.component.css']
})
export class AllHospitalComponent implements OnInit, AfterViewInit {
  allHospitals!: Hospital[];
  alldesignation!: AddDesignation[];
  reportingArray!: AddUser[];
  selectedHospitalId: string[] = [];
  isMasterSelected!: boolean;
  assignFormData: FormGroup;
  UserResData! : any[];
  userNoRecord = "No";
  selectedValue : string ="";
   // new code for dataSource
   displayedColumns = ['select','hid','name','address','mobile','state','city','pincode'];
   unAssignedCenter!: CenterAssignDataSource;
   componentValue = "unassigned";
   type : string = "";
   inputText = "";

   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;
   @ViewChild(MatTable) table! : MatTable<any>;

  constructor(private adminService : AdminServiceService,private fb : FormBuilder,private spinner : NgxSpinnerService, private router : Router) { 
    this.unAssignedCenter = new CenterAssignDataSource(this.adminService,this.spinner,this.componentValue,this.type,this.inputText);
    this.isMasterSelected = false; 
    this.assignFormData = fb.group({
      userId : new FormControl(''),
    });
  }

  ngAfterViewInit(): void {
    this.table.dataSource = this.unAssignedCenter;
      this.unAssignedCenter.paginator=this.paginator;
      this.unAssignedCenter.sort=this.sort;
  }

  ngOnInit(): void {}

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
    this.UserResData=[];
  }
  
checkUncheckAll(){
  for(var i = 0 ; i<this.paginator.pageSize; i++){
    this.unAssignedCenter.data[i].isSelected = this.isMasterSelected;
      if(this.isMasterSelected == true && !this.selectedHospitalId.includes(this.unAssignedCenter.data[i]._id)){ 
        this.selectedHospitalId.push(this.unAssignedCenter.data[i]._id);
      }
      if(this.isMasterSelected == false && this.selectedHospitalId.includes(this.unAssignedCenter.data[i]._id)){
        this.selectedHospitalId = this.selectedHospitalId.filter(m => m!=this.unAssignedCenter.data[i]._id);
      }
  }
}

selectedHospital(e : any, id: any){
  var lastIndex = 0;
    if(this.paginator.pageIndex == 0){
      lastIndex = this.paginator.pageSize;
    }
    else{
      lastIndex = (this.paginator.pageSize*this.paginator.pageIndex)+this.paginator.pageSize;
      if(lastIndex>this.unAssignedCenter.data.length){
        lastIndex = this.unAssignedCenter.data.length;
      }
    }
  for(let i=0;i<lastIndex;i++){
      if(this.unAssignedCenter.data[i].isSelected && !this.selectedHospitalId.includes(this.unAssignedCenter.data[i]._id)){
        this.selectedHospitalId.push(this.unAssignedCenter.data[i]._id);
      }
      if(!this.unAssignedCenter.data[i].isSelected && this.selectedHospitalId.includes(this.unAssignedCenter.data[i]._id)){
         this.selectedHospitalId = this.selectedHospitalId.filter(m => m!=this.unAssignedCenter.data[i]._id);
      }
      if(this.selectedHospitalId.length == this.paginator.pageSize){
            this.isMasterSelected = true;
      }else{
          this.isMasterSelected = false;
      }
  }
}


  assignCenter(){
    var assignHospitalDetails = new AssignHospital();
    assignHospitalDetails = this.assignFormData.value;
    assignHospitalDetails.assignedHospital = this.selectedHospitalId;
    this.adminService.assignCenterToUser(assignHospitalDetails).subscribe(( res : any) => {
      this.reloadCurrentRoute();
    })
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

searchUserInput(event : any){
  this.inputText = event.value;
  if(this.inputText.length >= 3){
    this.type = "search"
    this.unAssignedCenter = new CenterAssignDataSource(this.adminService,this.spinner,this.componentValue,this.type,this.inputText);
  }
  if(this.inputText.length == 0){
    this.type = ""
    this.unAssignedCenter = new CenterAssignDataSource(this.adminService,this.spinner,this.componentValue,this.type,this.inputText);
  }
  this.ngAfterViewInit();
 }

}
