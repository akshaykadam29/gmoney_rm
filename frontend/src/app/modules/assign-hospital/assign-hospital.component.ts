import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-assign-hospital',
  templateUrl: './assign-hospital.component.html',
  styleUrls: ['./assign-hospital.component.css']
})
export class AssignHospitalComponent implements OnInit {
 
  count1 : Number= 0;
  count2 : Number= 0;
  count3 : Number= 0;
  component : String = 'all';

  constructor(private adminService : AdminServiceService) {}

  ngOnInit(): void { 
      this.adminService.getAllUnassignedCenter().subscribe((res: any) => {
        this.count1 = res.results.length;
      });
      this.adminService.getAssignedCenter().subscribe((res: any) => {
        this.count2 = res.results.length;
      });
      this.adminService.getInactiveCenter().subscribe((res: any) => {
        this.count3 = res.results.length;
      });
   }

   ScreenNaviagte(value : any){
    if(value== 1){
      this.component = "all";
    }
    else if(value == 2){
      this.component = "assigned"
    }
    else if(value == 3){
      this.component = "inactive"
    }
   }

  
}
