import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login.service';
import { RmUserService } from 'src/app/services/rm-user.service';
import { LeadHistoryViewDialogComponent } from '../../dialog/lead-history-view-dialog/lead-history-view-dialog.component';
import { EffortDataSource } from '../effort-datasource';

@Component({
  selector: 'app-my-effort',
  templateUrl: './my-effort.component.html',
  styleUrls: ['./my-effort.component.css']
})
export class MyEffortComponent implements OnInit,AfterViewInit {

  myEffortLeads! : EffortDataSource;
  rmUserId = '';
  displayedColumns = ['number','center','city','pincode','category','status','updated_date','history'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table! : MatTable<any>;

  constructor(private loginService : LoginService, private rmUserService : RmUserService, private spinner : NgxSpinnerService,private matDialog : MatDialog) {
    var token = this.loginService.getUserPayload();
    if(token != null){
      this.rmUserId = token._id;
      this.myEffortLeads = new EffortDataSource(this.rmUserService,this.spinner,this.rmUserId);
    }
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.table.dataSource = this.myEffortLeads;
    this.myEffortLeads.paginator=this.paginator;
    this.myEffortLeads.sort=this.sort;
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
