import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login.service';
import { RmUserService } from 'src/app/services/rm-user.service';
import { ClaimHospitalDataSource } from '../claim-hospital-datasource';

@Component({
  selector: 'app-unclaimed-hospital',
  templateUrl: './unclaimed-hospital.component.html',
  styleUrls: ['./unclaimed-hospital.component.css']
})
export class UnclaimedHospitalComponent implements OnInit,AfterViewInit {
  unClaimedHospital!: ClaimHospitalDataSource;
  displayedColumns = ['action','created','name','address','state','city','pincode','hid'];
  componentValue = 'unClaimed';
  rmUserId = '';
  isMasterSelected!: boolean;
  selectedHospitalId: string[] = [];
  enabled! : boolean;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table! : MatTable<any>;
  
  constructor(private rmUserService : RmUserService, private spinner : NgxSpinnerService, private loginService : LoginService,private changeDetector: ChangeDetectorRef, private router : Router) {
    var token = this.loginService.getUserPayload();
    if(token != null){
      this.rmUserId = token._id;
      this.unClaimedHospital = new ClaimHospitalDataSource(this.rmUserService,this.spinner,this.componentValue,this.rmUserId);
      console.log(this.unClaimedHospital)
    }
   }

  ngAfterViewInit(): void {
    this.table.dataSource = this.unClaimedHospital;
    this.unClaimedHospital.paginator=this.paginator;
    this.unClaimedHospital.sort=this.sort;
  }

  ngOnInit(): void {
  }

  claimHospital(hospitalObjId: any){
    var tabValue = "claim";
   this.rmUserService.setHospitalClaimedByRm(hospitalObjId,this.rmUserId,tabValue).subscribe((res : any) => {
    this.reloadCurrentRoute();
   })
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        localStorage.setItem('componentValue', 'new')
    });
  }

 
}
