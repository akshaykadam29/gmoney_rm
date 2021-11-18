import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AssignLeads } from 'src/app/models/assignLeads';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { LeadAssignDataSource } from '../lead-assign-datasource';

@Component({
  selector: 'app-unassigned-lead',
  templateUrl: './unassigned-lead.component.html',
  styleUrls: ['./unassigned-lead.component.css']
})

export class UnassignedLeadComponent implements OnInit, AfterViewInit {
  unAssignedLeads!: LeadAssignDataSource;
  displayedColumns = ['select','center','address','city','pincode','contact','mobile','landline','email','platform_type'];
  componentValue = "unassigned";
  assignLeadFormData: FormGroup;
  isMasterSelected!: boolean;
  UserResData! : any[];
  userNoRecord = "No";
  selectedValue : string ="";
  selectedLeadId: string[] = [];
  assignleadDetails! : AssignLeads;
  type : string = "";
  inputText = "";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table! : MatTable<any>;

  constructor(private adminService : AdminServiceService,private fb : FormBuilder, private spinner : NgxSpinnerService, private router : Router) {
    this.unAssignedLeads = new LeadAssignDataSource(this.adminService,this.componentValue,this.type,this.spinner,this.inputText);
    console.log(this.unAssignedLeads)
    this.isMasterSelected = false;
    this.assignLeadFormData = fb.group({
      userId : new FormControl(''),
    });
   }

   ngAfterViewInit(): void {
    this.table.dataSource = this.unAssignedLeads;
      this.unAssignedLeads.paginator=this.paginator;
      this.unAssignedLeads.sort=this.sort;
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
          console.log("Response", this.UserResData)
      });
    }
  }

  checkUncheckAll(){
    console.log(this.paginator.pageSize)
    for(var i = 0 ; i<this.paginator.pageSize; i++){
      this.unAssignedLeads.data[i].isSelected = this.isMasterSelected;
        if(this.isMasterSelected == true && !this.selectedLeadId.includes(this.unAssignedLeads.data[i]._id)){ 
          this.selectedLeadId.push(this.unAssignedLeads.data[i]._id);
        }
        if(this.isMasterSelected == false && this.selectedLeadId.includes(this.unAssignedLeads.data[i]._id)){
          this.selectedLeadId = this.selectedLeadId.filter(m => m!=this.unAssignedLeads.data[i]._id);
        }
    }
    console.log(this.selectedLeadId);
}

selectedLead(e : any, id: any){
  for(let i=0;i<this.paginator.pageSize;i++){
      if(this.unAssignedLeads.data[i].isSelected && !this.selectedLeadId.includes(this.unAssignedLeads.data[i]._id)){
        this.selectedLeadId.push(this.unAssignedLeads.data[i]._id);
      }
      if(!this.unAssignedLeads.data[i].isSelected && this.selectedLeadId.includes(this.unAssignedLeads.data[i]._id)){
         this.selectedLeadId = this.selectedLeadId.filter(m => m!=this.unAssignedLeads.data[i]._id);
      }
      if(this.selectedLeadId.length == this.paginator.pageSize){
            this.isMasterSelected = true;
      }else{
          this.isMasterSelected = false;
      }
  }
  console.log(this.selectedLeadId);
}

  userSelected(e : any) {
    this.selectedValue = e.target.options[e.target.options.selectedIndex].text;
    this.UserResData=[];
    console.log("Selected",this.selectedValue)
  }

  assignLead(){
    this.assignleadDetails = this.assignLeadFormData.value;
    this.assignleadDetails.leadId = this.selectedLeadId;
    console.log(this.assignleadDetails);
    this.adminService.assignLeadToUser(this.assignleadDetails).subscribe(( res : any) => {
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
    this.unAssignedLeads = new LeadAssignDataSource(this.adminService,this.componentValue,this.type,this.spinner,this.inputText);
  }
  if(this.inputText.length == 0){
    this.type = ""
    this.unAssignedLeads = new LeadAssignDataSource(this.adminService,this.componentValue,this.type,this.spinner,this.inputText);
  }
  console.log(this.unAssignedLeads)
  this.ngAfterViewInit();
 }

}