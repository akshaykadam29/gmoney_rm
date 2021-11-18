import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login.service';
import { RmUserService } from 'src/app/services/rm-user.service';
import { SchemeViewDialogComponent } from '../../dialog/scheme-view-dialog/scheme-view-dialog.component';
import { ClaimHospitalDataSource } from '../claim-hospital-datasource';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-my-claimed-hospital',
  templateUrl: './my-claimed-hospital.component.html',
  styleUrls: ['./my-claimed-hospital.component.css']
})
export class MyClaimedHospitalComponent implements OnInit,AfterViewInit {
  rmUserId = '';
  myClaimedHospital!: ClaimHospitalDataSource;
  componentValue = 'myClaimed';
  displayedColumns = ['action','scheme','created','hid','name','address','state','city','pincode'];
  policyScheme = '';
  nonPolicyScheme = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table! : MatTable<any>;
  
  constructor(private rmUserService : RmUserService, private spinner : NgxSpinnerService, private loginService : LoginService, private router : Router, private matDialog : MatDialog){
    var token = this.loginService.getUserPayload();
    if(token != null){
      this.rmUserId = token._id;
      this.myClaimedHospital = new ClaimHospitalDataSource(this.rmUserService,this.spinner,this.componentValue,this.rmUserId)
    }
   }
  
  ngAfterViewInit(): void {
    this.table.dataSource = this.myClaimedHospital;
    this.myClaimedHospital.paginator=this.paginator;
    this.myClaimedHospital.sort=this.sort;
  }

  ngOnInit(): void {
    this.rmUserService.getAllPolicySchemes().subscribe((policyData : any) =>{
      this.policyScheme=policyData;
    });
    this.rmUserService.getAllNonPolicySchemes().subscribe((nonPolicyData : any) =>{
      this.nonPolicyScheme=nonPolicyData;
    });
  }
  
  releaseHospital(hospitalObjId: any){
    var tabValue = "release";
    this.rmUserService.setHospitalClaimedByRm(hospitalObjId,this.rmUserId,tabValue).subscribe((res : any) => {
      this.reloadCurrentRoute();
    });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        localStorage.setItem('componentValue', 'myclaimed')
    });
  }


  viewSchemes(hospObjId : any){
    this.viewAllSchemesinDialog(this.policyScheme,this.nonPolicyScheme,hospObjId)
  }

  viewAllSchemesinDialog(policyScheme : any, nonPolicyScheme : any, hospObjId : any){ 
    this.matDialog.open(SchemeViewDialogComponent,{
      height: '400px',
      width: '600px',
      data : {
        policyScheme : policyScheme.results,
        nonPolicyScheme : nonPolicyScheme.results,
        hospitalId : hospObjId,
        rmuserId : this.rmUserId,
        disableClose : true,
        autoFocus : true
      }
    });
  }
}
