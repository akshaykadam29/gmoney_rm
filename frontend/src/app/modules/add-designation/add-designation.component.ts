import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { AddDesignation } from 'src/app/models/addDesignation';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-add-designation',
  templateUrl: './add-designation.component.html',
  styleUrls: ['./add-designation.component.css']
})
export class AddDesignationComponent implements OnInit {

  access= [
    {
      name : "Read",
      value : "R"
    },
    {
      name : "Write",
      value : "W"
    },
    {
      name : "Edit",
      value : "E"
    },
    {
      name : "Delete",
      value : "D"
    }
  ];
  designationForm : FormGroup;
  selectedItems: string[] = [];

  constructor(private fb : FormBuilder, private adminService : AdminServiceService, private loginService : LoginService, private router : Router ) { 
    this.designationForm = fb.group({
      role : new FormControl(),
      sort : new FormControl(),
      roleAccess : new FormControl()
    })
  }
 
  ngOnInit(): void {
    if(!this.loginService.isLoggedIn()){
      this.loginService.deleteToken();
      this.router.navigateByUrl('/login');
    }
    this.selectedItems = new Array<string>();  
    this.designationForm.reset();
  }

  onSubmit(){
    var designationDetails = new AddDesignation();
    designationDetails = this.designationForm.value;
    designationDetails.roleAccess = this.selectedItems;
    this.adminService.saveDesignationDetails(designationDetails).subscribe((res : any) => {
      this.designationForm.reset();
    });
  }

  getselectedBox(e:any,id:string){
    if(e.target.checked){
      this.selectedItems.push(id);
    }
    else{
      this.selectedItems = this.selectedItems.filter(m => m!=id);
    }
  }
}
