import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { LoginService } from 'src/app/services/login.service';
import { RmUserService } from 'src/app/services/rm-user.service';
import { LeadHistoryViewDialogComponent } from '../../dialog/lead-history-view-dialog/lead-history-view-dialog.component';
import { EffortDataSource } from '../effort-datasource';

@Component({
  selector: 'app-team-effort',
  templateUrl: './team-effort.component.html',
  styleUrls: ['./team-effort.component.css']
})
export class TeamEffortComponent implements OnInit,AfterViewInit {
  rmUserId = "";
  allDirectReportee! : any[];
  allChildReportee! : any[];
  myTeamEffortLeads! : EffortDataSource;
  displayedColumns = ['center','city','pincode','category','status','updated_date','history'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table! : MatTable<any>;

  constructor(private loginService : LoginService, private adminService : AdminServiceService,private rmUserService : RmUserService, private spinner : NgxSpinnerService ,private matDialog : MatDialog) {
    var token = this.loginService.getUserPayload();
    if(token !=null){
      this.rmUserId = token._id;
      this.getDirectReportee(this.rmUserId);
    }
  }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(){
    this.table.dataSource = this.myTeamEffortLeads;
    this.myTeamEffortLeads.paginator=this.paginator;
    this.myTeamEffortLeads.sort=this.sort;
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
          this.myTeamEffortLeads = new EffortDataSource(this.rmUserService,this.spinner,event.target.value);
          this.ngAfterViewInit();
     }
   }
 }

  directChildSelected(event: any){
    if(!event.target.value == false){
      if(event.target.value != "All" ){
        this.myTeamEffortLeads = new EffortDataSource(this.rmUserService,this.spinner,event.target.value);
          this.ngAfterViewInit();
      }
    }
  }

 viewHistory(historyDetails : any){
  this.viewLeadHistoryinDialog(historyDetails);
}

viewLeadHistoryinDialog(leadhistory : any){ 
  this.matDialog.open(LeadHistoryViewDialogComponent,{
    height: '500px',
    width: '600px',
    data : {
      history : leadhistory,
      disableClose : true,
      autoFocus : true
    }
  });
}

}
