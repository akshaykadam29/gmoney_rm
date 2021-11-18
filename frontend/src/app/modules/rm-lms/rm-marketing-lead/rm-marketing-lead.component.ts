import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Lead } from 'src/app/models/lead';
import { LoginService } from 'src/app/services/login.service';
import { RmLmsService } from 'src/app/services/rm-lms.service';

@Component({
  selector: 'app-rm-marketing-lead',
  templateUrl: './rm-marketing-lead.component.html',
  styleUrls: ['./rm-marketing-lead.component.css']
})
export class RmMarketingLeadComponent implements OnInit {
  search = "";
  date:any;
  myDatePicker : any;
  singleLeadDetails!: FormGroup;
  marketingLeadResData! : Lead[];
  totalLeads : any = 0;
  previewCounter : number = 0;
  prevButton : boolean = false;
  nextButton : boolean = true;
  isData : boolean = false;
  id: any;
  leadResData! : any[];
  leadNoRecord = "No";
  selectedValue : string ="";
  
  constructor(private fb : FormBuilder,private loginService : LoginService, private rmLeadService : RmLmsService) {
    var token = this.loginService.getUserPayload();
    if(token !=null){
       this.id = token._id;
       this.setRmAllAssignedLeadsById();
    }
   }

  ngOnInit(): void {}

  
  setRmAllAssignedLeadsById(){
    this.rmLeadService.getRmAllAssignedLeadsById(this.id,"marketing").subscribe((res : any) => {
      if(res.results.length != 0){
        this.marketingLeadResData = res.results;
        this.totalLeads = res.results.length;
        this.setSingleLeadData(); 
      }
      else{
            this.isData = false;
            this.nextButton = false;
            this.prevButton = false;
      }      
    });
  }

  setSingleLeadData(){
    if(this.totalLeads <=1 ){
      this.nextButton = false;
      this.prevButton = false;
    }
    if(this.totalLeads > 1){
      this.nextButton = true;
    }
    if(this.marketingLeadResData.length > 0){
      this.isData = true;
      this.singleLeadDetails =  this.fb.group({
        lead_id : new FormControl(this.marketingLeadResData[0]._id,),
        center : new FormControl(this.marketingLeadResData[0].center),
        address : new FormControl(this.marketingLeadResData[0].address),
        city : new FormControl(this.marketingLeadResData[0].city),
        contact : new FormControl(this.marketingLeadResData[0].contact),
        mobile : new FormControl(this.marketingLeadResData[0].mobile),
        landline : new FormControl(this.marketingLeadResData[0].landline),
        pincode : new FormControl(this.marketingLeadResData[0].pincode),
        action : new FormControl(''),
        actionDate : new FormControl(''),
        status : new FormControl(''),
        remark : new FormControl(this.marketingLeadResData[0].remark + this.marketingLeadResData[0].remark1 + this.marketingLeadResData[0].remark2),
        cat : new FormControl('')
      });
    }
  }

  setPrevNextLeadValues(clickedButton : any){
    if(clickedButton == 'Prev'){
      this.previewCounter--;
      this.nextButton = true;
      if(this.previewCounter==0){
        this.prevButton = false;
      }
      this.setNewSingleLeadDeatils(this.previewCounter);
    }
    if(clickedButton == 'Next'){
      this.previewCounter++;
      this.prevButton = true;
      if(this.previewCounter == (this.totalLeads -1)){
        this.nextButton = false;
      }
      this.singleLeadDetails.reset();
      this.setNewSingleLeadDeatils(this.previewCounter);
    }
  }

  setNewSingleLeadDeatils(counterNew : any){
    this.singleLeadDetails =  this.fb.group({
      lead_id : new FormControl(this.marketingLeadResData[counterNew]._id),
      center : new FormControl(this.marketingLeadResData[counterNew].center),
      address : new FormControl(this.marketingLeadResData[counterNew].address),
      city : new FormControl(this.marketingLeadResData[counterNew].city),
      contact : new FormControl(this.marketingLeadResData[counterNew].contact),
      mobile : new FormControl(this.marketingLeadResData[counterNew].mobile),
      landline : new FormControl(this.marketingLeadResData[counterNew].landline),
      pincode : new FormControl(this.marketingLeadResData[counterNew].pincode),
      action : new FormControl(''),
      actionDate : new FormControl(''),
      status : new FormControl(''),
      remark : new FormControl(this.marketingLeadResData[counterNew].remark + this.marketingLeadResData[counterNew].remark1 + this.marketingLeadResData[counterNew].remark2),
      cat : new FormControl('')
    });
  }

  saveLeadDetails(){
    this.rmLeadService.saveLeadDetails(this.singleLeadDetails.value).subscribe(res => {
      if(this.search != ""){
        this.searchLeadByInput("",this.search)
      }else{
        this.setRmAllAssignedLeadsById();
      }
    });
  }

  
  searchLeadByInput(input :any,searchMethodInput : any){
    var inputText = '';
    if(searchMethodInput != ""){
      inputText = searchMethodInput
    }else{
      inputText = input.value;
    }
    if(inputText.length >= 3){
      this.rmLeadService.getLeadsByUserInput(inputText,"marketing",this.id).subscribe((response : any) => {
          if(response.results.length != 0){
            this.marketingLeadResData = response.results;
            this.totalLeads = response.results.length;
            this.setSingleLeadData();
          }
            else{
              this.isData = false;
              this.nextButton = false;
              this.prevButton = false;
          }
      });
    }
  }

  resetSearchBox(){
    this.search = "";
    this.setRmAllAssignedLeadsById();
  }

}
