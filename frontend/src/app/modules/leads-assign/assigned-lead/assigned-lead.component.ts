import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { LeadAssignDataSource } from '../lead-assign-datasource';

@Component({
  selector: 'app-assigned-lead',
  templateUrl: './assigned-lead.component.html',
  styleUrls: ['./assigned-lead.component.css']
})
export class AssignedLeadComponent implements OnInit {
  assignedLeads!: LeadAssignDataSource;
  displayedColumns = ['center','address','city','pincode','contact','mobile','email','platform_type','AssignedTo'];
  componentValue = "assigned";
  type : string = "";
  inputText = "";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table! : MatTable<any>;
  
  constructor(private adminService : AdminServiceService, private spinner : NgxSpinnerService) { 
    this.assignedLeads = new LeadAssignDataSource(this.adminService,this.componentValue,this.type,this.spinner,this.inputText);
    console.log(this.assignedLeads)
   }

   ngAfterViewInit(): void {
    this.table.dataSource = this.assignedLeads;
      this.assignedLeads.paginator=this.paginator;
      this.assignedLeads.sort=this.sort;
  }

  ngOnInit(): void {
  }

  searchUserInput(event : any){
    this.inputText = event.value;
    if(this.inputText.length >= 3){
      this.type = "search"
      this.assignedLeads = new LeadAssignDataSource(this.adminService,this.componentValue,this.type,this.spinner,this.inputText);
      console.log(this.assignedLeads)
    }
    if(this.inputText.length == 0){
      this.type = ""
      this.assignedLeads = new LeadAssignDataSource(this.adminService,this.componentValue,this.type,this.spinner,this.inputText);
      console.log(this.assignedLeads)
    }
    
    this.ngAfterViewInit();
   }

}
