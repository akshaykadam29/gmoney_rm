import { MatTableDataSource } from "@angular/material/table";
import { RmUserService } from "src/app/services/rm-user.service";

export class EffortDataSource extends MatTableDataSource<any>{
    
    constructor(private rmUserService : RmUserService, private spinner : any, private rmId : any){
        super();
        this.spinner.show();
        this.rmUserService.getRmLeadsEffortById(this.rmId).subscribe((res : any) =>{
            if(res){
                this.data = res.results;
                this.spinner.hide();
            }
        })
    }
}