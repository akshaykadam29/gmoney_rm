import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-lead-history-view-dialog',
  templateUrl: './lead-history-view-dialog.component.html',
  styleUrls: ['./lead-history-view-dialog.component.css']
})
export class LeadHistoryViewDialogComponent implements OnInit {
  leadHistoryDetails: any =[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.leadHistoryDetails = data.history;
  }

  ngOnInit(): void {
  }

}
