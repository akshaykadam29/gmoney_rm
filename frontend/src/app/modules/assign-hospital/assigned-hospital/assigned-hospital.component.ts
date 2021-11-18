import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Hospital } from 'src/app/models/hospital';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { CenterAssignDataSource } from '../center-assign-datasource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-assigned-hospital',
  templateUrl: './assigned-hospital.component.html',
  styleUrls: ['./assigned-hospital.component.css']
})
export class AssignedHospitalComponent implements OnInit,AfterViewInit {
  assignedHospitals!: Hospital[];
  displayedColumns = ['hid','name','mobile','state','city','pincode','rm_assigned'];
  assignedCenter!: CenterAssignDataSource;
  componentValue = "assigned";
  type : string = "";
  inputText = "";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table! : MatTable<any>;

  constructor(private adminService : AdminServiceService, private spinner : NgxSpinnerService) { 
    this.assignedCenter = new CenterAssignDataSource(this.adminService,this.spinner,this.componentValue,this.type,this.inputText );
  }

  ngAfterViewInit(): void {
    this.table.dataSource = this.assignedCenter;
      this.assignedCenter.paginator=this.paginator;
      this.assignedCenter.sort=this.sort;
  }

  ngOnInit(): void {}

  searchUserInput(event : any){
    this.inputText = event.value;
    if(this.inputText.length >= 3){
      this.type = "search"
      this.assignedCenter = new CenterAssignDataSource(this.adminService,this.spinner,this.componentValue,this.type,this.inputText);
    }
    if(this.inputText.length == 0){
      this.type = ""
      this.assignedCenter = new CenterAssignDataSource(this.adminService,this.spinner,this.componentValue,this.type,this.inputText);
    }
    this.ngAfterViewInit();
   }
  
}
