import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Lead } from 'src/app/models/lead';
import { LoginService } from 'src/app/services/login.service';
import { RmLmsService } from 'src/app/services/rm-lms.service';

@Component({
  selector: 'app-rm-add-lead',
  templateUrl: './rm-add-lead.component.html',
  styleUrls: ['./rm-add-lead.component.css']
})
export class RmAddLeadComponent implements OnInit {
  saveSingleLeadDetails!: FormGroup;
  id: any;

  constructor(private fb : FormBuilder, private rmLeadService : RmLmsService,private loginService : LoginService) { 
    this.saveSingleLeadDetails =  this.fb.group({
      lead_id : new FormControl(''),
      center : new FormControl(''),
      address : new FormControl(''),
      city : new FormControl(''),
      contact : new FormControl(''),
      mobile : new FormControl(''),
      landline : new FormControl(''),
      pincode : new FormControl('')
    });
  }

  ngOnInit(): void {
    var token = this.loginService.getUserPayload();
      if(token !=null){
         this.id = token._id;
      }
  }

  saveLeadDetails(){
    var id = this.id;
    this.rmLeadService.saveNewLeadDetails(id,this.saveSingleLeadDetails.value).subscribe(res => {
      if(res){
        this.saveSingleLeadDetails.reset();
      }
    });
  }


}
