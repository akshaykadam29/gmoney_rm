import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Scheme } from 'src/app/models/scheme';
import { TempSchemeSelection } from 'src/app/models/tempSchemeSelection';
import { RmUserService } from 'src/app/services/rm-user.service';

@Component({
  selector: 'app-scheme-view-dialog',
  templateUrl: './scheme-view-dialog.component.html',
  styleUrls: ['./scheme-view-dialog.component.css']
})
export class SchemeViewDialogComponent implements OnInit {

  allPolicySchemesList: Scheme[];
  allNonPolicySchemesList : Scheme[];
  schemesSelectedId: any =[];
  policyTemp : any=[];
  nonPolicyTemp : any = [];
  hospitalObjId : any = "";
  defaultPolSelectedValue = "";
  defaultNonPolSelectedValue = "";
  errorPolicy : boolean = false;
  errorNonPolicy : boolean = false;
  error : boolean = false;
  rmId : any = "";
  
  constructor(public dialogRef: MatDialogRef<SchemeViewDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private rmservice: RmUserService, private router : Router) {
    this.allPolicySchemesList = data.policyScheme;
    this.allNonPolicySchemesList = data.nonPolicyScheme;
    this.hospitalObjId = data.hospitalId;
    this.rmId = data.rmuserId;
   }

  ngOnInit(): void {}

  selectedScheme(id : any, policyIndex : any, nonPolicyIndex : any, listIndex : any){
    if(policyIndex != null){
      var results =this.policyTemp.includes(this.allPolicySchemesList[policyIndex]._id);
        if(results == false){
          this.policyTemp.push(this.allPolicySchemesList[policyIndex]._id);
          this.schemesSelectedId.push({
            id : id,
            index : listIndex,
            policyIndex : policyIndex,
            policyType : 0
          });
        }
        else{
          for(var i=0;i<this.schemesSelectedId.length; i++){
            if(this.schemesSelectedId[i].policyIndex == policyIndex && this.schemesSelectedId[i].policyType == 0){
             this.schemesSelectedId.splice(i,1);
             this.policyTemp.push(this.allPolicySchemesList[policyIndex]._id);
             this.schemesSelectedId.push({
              id : id,
              index : listIndex,
              policyIndex : policyIndex,
              policyType : 0
            });
            }
          }
        }
  }
  if(nonPolicyIndex != null){
    var results =this.nonPolicyTemp.includes(this.allNonPolicySchemesList[nonPolicyIndex]._id);
      if(results == false){
        this.nonPolicyTemp.push(this.allNonPolicySchemesList[nonPolicyIndex]._id);
        this.schemesSelectedId.push({
          id : id,
          index : listIndex,
          nonPolicyIndex : nonPolicyIndex,
          policyType : 1
        });
      }
      else{
        for(var i=0;i<this.schemesSelectedId.length; i++){
          if(this.schemesSelectedId[i].nonPolicyIndex == nonPolicyIndex && this.schemesSelectedId[i].policyType == 1){
           this.schemesSelectedId.splice(i,1);
           this.nonPolicyTemp.push(this.allNonPolicySchemesList[nonPolicyIndex]._id);
           this.schemesSelectedId.push({
            id : id,
            index : listIndex,
            nonPolicyIndex : nonPolicyIndex,
            policyType : 1
          });
          }
        }
      }  
    }
  }

  defaultPolicySelected(selectedId : any){
    this.defaultPolSelectedValue = selectedId;
  }

  defaultNonPolicySelected(selectedId : any){
    this.defaultNonPolSelectedValue = selectedId;
  }

  saveSelectedScheme(){
    this.errorNonPolicy=false;
    this.errorPolicy = false;
    if(this.defaultPolSelectedValue == ""){
      this.errorPolicy = true;
      return;
    }
    else if(this.defaultNonPolSelectedValue == ""){
      this.errorNonPolicy= true;
      return;
    }
    else{
      var finalSelectedList = [];
      var completeList = [];
      for(var i= 0; i<this.schemesSelectedId.length; i++){
            finalSelectedList.push(this.schemesSelectedId[i].id);
      }
      var results1 = finalSelectedList.includes(this.defaultNonPolSelectedValue);
      var results2 = finalSelectedList.includes(this.defaultPolSelectedValue)
      if(results1 == true && results2 == true){
          completeList.push({
            hospitalId : this.hospitalObjId,
            selectedSchemes : finalSelectedList,
            defaultSchemes : {
              policy : this.defaultPolSelectedValue,
              non_policy : this.defaultNonPolSelectedValue
            },
            userId : this.rmId
          });
          this.rmservice.saveSchemeSelectedByRm(completeList).subscribe((res : any) => {
            if(res){
              this.dialogRef.close();
              this.reloadCurrentRoute();
            }
          });
      }
      else{
        this.error = true;
        return;
      }
      }
    }

    reloadCurrentRoute() {
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);  
          localStorage.setItem('componentValue', 'myclaimed');
      });
    }
}
