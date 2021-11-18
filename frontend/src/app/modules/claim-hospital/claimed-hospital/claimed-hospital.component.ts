import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Hospital } from 'src/app/models/hospital';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { LoginService } from 'src/app/services/login.service';
import { RmUserService } from 'src/app/services/rm-user.service';
import { AssignDisputeClaimHospitalDialogComponent } from '../../dialog/assign-dispute-claim-hospital-dialog/assign-dispute-claim-hospital-dialog.component';
import { ClaimHospitalDataSource } from '../claim-hospital-datasource';

@Component({
  selector: 'app-claimed-hospital',
  templateUrl: './claimed-hospital.component.html',
  styleUrls: ['./claimed-hospital.component.css']
})
export class ClaimedHospitalComponent implements OnInit,AfterViewInit {
  claimedHospital!: ClaimHospitalDataSource;

  rmUserId = '';
  componentValue = 'claimed';
  displayedColumns = ['action','claimedBy','disputedBy','hid','name','address','state','city','pincode'];
  claimFormData! : FormGroup;
  disputeFlag : boolean = false;
  claimedHospitalModel!: Hospital[];
  showActionColumn : boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table! : MatTable<any>;

  constructor(private rmUserService : RmUserService, private spinner : NgxSpinnerService, private loginService : LoginService, private router : Router, private adminService : AdminServiceService,private matDialog : MatDialog){
    var token = this.loginService.getUserPayload();
    if(token != null){
      this.rmUserId = token._id;
      this.showActionColumn = localStorage.getItem('designation') == 'User';
      this.claimedHospital = new ClaimHospitalDataSource(this.rmUserService,this.spinner,this.componentValue,this.rmUserId);
      this.claimedHospitalModel = this.claimedHospital.data;
    } 
   }

   ngAfterViewInit(): void {
    this.table.dataSource = this.claimedHospital;
      this.claimedHospital.paginator=this.paginator;
      this.claimedHospital.sort=this.sort;
  }

  ngOnInit(): void {}

  getDisputedRmId(rmData : any){
    if(rmData){
      return rmData.name;
    }
    else{
      return "-";
    }
  }


  raiseDispute(hospitalObjId: any){
    var tabValue = "dispute";
    this.rmUserService.setHospitalClaimedByRm(hospitalObjId,this.rmUserId,tabValue).subscribe((res : any) => {
      this.reloadCurrentRoute();
    });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        localStorage.setItem('componentValue', 'claimed')
    });
  }

  claimAssignment(hospitalId : any){
    this.assignDisputedHospitalinDialog(hospitalId);
  }

  
  assignDisputedHospitalinDialog(hospitalId : any){ 
    this.matDialog.open(AssignDisputeClaimHospitalDialogComponent,{
      height: '200px',
      width: '500px',
      data : {
        hospitalId : hospitalId,
        disableClose : true,
        autoFocus : true
      }
    });
  }

}
