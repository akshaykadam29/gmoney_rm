import { MatTableDataSource } from "@angular/material/table";
import { AdminServiceService } from "src/app/services/admin-service.service";

export class CenterAssignDataSource extends MatTableDataSource<any> {
  
    constructor(private adminService : AdminServiceService, private spinner : any, private dataParam :any,private type : any, private userInput : any) {
      super();
      this.spinner.show();
      if(dataParam == "unassigned" && type == ""){
        this.adminService.getAllCenterDataSource().subscribe((res: any) => {
          this.data = res.results;
          this.spinner.hide();
        });
      }
      if(dataParam == "assigned" && type == ""){
        this.adminService.getAllAssignedCenterDataSource().subscribe((res: any) => {
          this.data = res.results;
          this.spinner.hide();
        });
      }
      if(type == "search"){
        this.spinner.show();
        this.adminService.getCenterByUserSearchDataSource(this.userInput,this.dataParam).subscribe((res : any) => {
          this.data = res.results;
          this.spinner.hide();
        })
      }
     
    }
  
  }