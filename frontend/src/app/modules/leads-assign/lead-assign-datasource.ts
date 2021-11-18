import { MatTableDataSource } from "@angular/material/table";
import { AdminServiceService } from "src/app/services/admin-service.service";

export class LeadAssignDataSource extends MatTableDataSource<any> {
  
    constructor(private adminService : AdminServiceService, private componentValue : any, private type : any, private spinner : any, private userInput : any) {
      super();
     
      if(type == ""){
        this.spinner.show();
        this.adminService.getAllDataSourceData(this.componentValue).subscribe((res: any) => {
          this.data = res.results;
          this.spinner.hide();
        });
      }
      if(type == "search"){
        this.spinner.show();
        this.adminService.getLeadByUserSearchDataSource(this.userInput,this.componentValue).subscribe((res : any) => {
          this.data = res.results;
          this.spinner.hide();
        })
      }
      
    }
  
  }