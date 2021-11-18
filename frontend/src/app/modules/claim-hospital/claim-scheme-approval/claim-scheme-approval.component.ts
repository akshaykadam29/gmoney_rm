import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Hospital } from 'src/app/models/hospital';
import { LoginService } from 'src/app/services/login.service';
import { RmUserService } from 'src/app/services/rm-user.service';
import { ClaimHospitalDataSource } from '../claim-hospital-datasource';

@Component({
  selector: 'app-claim-scheme-approval',
  templateUrl: './claim-scheme-approval.component.html',
  styleUrls: ['./claim-scheme-approval.component.css']
})
export class ClaimSchemeApprovalComponent implements OnInit,AfterViewInit {

  rmUserId = '';
  componentValue = 'approval';
  PendingApproveHospital! : ClaimHospitalDataSource;
  hospitalDetails! : Hospital;
  displayedColumns = ['hid','name','address','state','city','pincode','allocatedBy','defaultScheme','allocatedScheme','action'];

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table! : MatTable<any>;

  constructor(private rmUserService : RmUserService, private spinner :NgxSpinnerService,private loginService : LoginService, private router : Router) { 
    var token = this.loginService.getUserPayload();
    if(token != null){
      this.rmUserId = token._id;
    this.PendingApproveHospital = new ClaimHospitalDataSource(this.rmUserService,this.spinner,this.componentValue,this.rmUserId)
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.table.dataSource = this.PendingApproveHospital;
    this.PendingApproveHospital.paginator=this.paginator;
    this.PendingApproveHospital.sort=this.sort;
  }

  approveScheme(tempSchemeId : any){
    this.rmUserService.updateApprovedSchemeInHospital(tempSchemeId).subscribe((res : any) => {
      if(res){
        this.reloadCurrentRoute();
      }
    })
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        localStorage.setItem('componentValue', 'approval')
    });
  }

}
