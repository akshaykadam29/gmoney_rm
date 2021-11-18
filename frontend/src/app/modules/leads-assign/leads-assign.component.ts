import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lead } from 'src/app/models/lead';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-leads-assign',
  templateUrl: './leads-assign.component.html',
  styleUrls: ['./leads-assign.component.css']
})
export class LeadsAssignComponent implements OnInit {
  leadData! : Lead;
  count0 : Number=0;
  count1 : Number= 0;
  count2 : Number= 0;
  count3 : Number= 0;

  component : String = 'unassign';
  constructor(private adminService : AdminServiceService, private router : Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.adminService.getTotalLeadCount().subscribe((res: any) => {
      this.count0 = res.count;
    });
    this.adminService.getAllUnassignLead().subscribe((res: any) => {
      this.count1 = res.count;
    });
    this.adminService.getAllAssignLead().subscribe((res: any) => {
      this.count2 = res.count;
    });
    // this.adminService.getAllOnboardedLead().subscribe((res: any) => {
    //  // this.count3 = res.results.length;
    // });  
  }

  leadFileUpload(event : any){
    this.spinner.show();
    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append('file',selectedFile)
    this.adminService.saveAllLeads(formData).subscribe((res: any) => {     
      if(res){
        console.log(res);
        this.spinner.hide();
        this.reloadCurrentRoute();
      }
    });
  }
 
  ScreenNaviagte(value : any){
    if(value== 1){
      this.component = "unassign";
    }
    else if(value == 2){
      this.component = "assigned"
    }
    else if(value == 3){
      this.component = "onboarded"
    }
   }

   reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}
}
