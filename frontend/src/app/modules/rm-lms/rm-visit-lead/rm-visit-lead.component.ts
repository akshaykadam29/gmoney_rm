import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Lead } from 'src/app/models/lead';
import { LoginService } from 'src/app/services/login.service';
import { RmLmsService } from 'src/app/services/rm-lms.service';

@Component({
  selector: 'app-rm-visit-lead',
  templateUrl: './rm-visit-lead.component.html',
  styleUrls: ['./rm-visit-lead.component.css']
})
export class RmVisitLeadComponent implements OnInit {
  date:any;
  search = "";
  myDatePicker : any;
  singleLeadDetails!: FormGroup;
  assignedLeadResData! : Lead[];
  totalLeads : any = 0;
  previewCounter : number = 0;
  prevButton : boolean = false;
  nextButton : boolean = true;
  isData : boolean = false;
  id: any;
  historyList! : any[];
  selectedValue : string ="";

  constructor(private fb : FormBuilder,private loginService : LoginService, private rmLeadService : RmLmsService) {
    var token = this.loginService.getUserPayload();
      if(token !=null){
         this.id = token._id;
         this.setRmAllAssignedLeadsById();
      }
   }

  ngOnInit(): void {
  }

  setRmAllAssignedLeadsById(){
    this.rmLeadService.getRmAllAssignedLeadsById(this.id,"visit").subscribe((res : any) => {
      if(res.results.length != 0){
        this.assignedLeadResData = res.results;
        this.historyList = res.results[0].history;
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
    if(this.assignedLeadResData.length > 0){
      this.isData = true;
      this.singleLeadDetails =  this.fb.group({
        lead_id : new FormControl(this.assignedLeadResData[0]._id),
        center : new FormControl(this.assignedLeadResData[0].center),
        address : new FormControl(this.assignedLeadResData[0].address),
        city : new FormControl(this.assignedLeadResData[0].city),
        contact : new FormControl(this.assignedLeadResData[0].contact),
        mobile : new FormControl(this.assignedLeadResData[0].mobile),
        landline : new FormControl(this.assignedLeadResData[0].landline),
        pincode : new FormControl(this.assignedLeadResData[0].pincode),
        action : new FormControl(''),
        actionDate : new FormControl(''),
        status : new FormControl(''),
        remark : new FormControl(''),
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
    this.historyList =this.assignedLeadResData[counterNew].history;
    this.singleLeadDetails =  this.fb.group({
      lead_id : new FormControl(this.assignedLeadResData[counterNew]._id),
      center : new FormControl(this.assignedLeadResData[counterNew].center),
      address : new FormControl(this.assignedLeadResData[counterNew].address),
      city : new FormControl(this.assignedLeadResData[counterNew].city),
      contact : new FormControl(this.assignedLeadResData[counterNew].contact),
      mobile : new FormControl(this.assignedLeadResData[counterNew].mobile),
      landline : new FormControl(this.assignedLeadResData[counterNew].landline),
      pincode : new FormControl(this.assignedLeadResData[counterNew].pincode),
      action : new FormControl(''),
      actionDate : new FormControl(''),
      status : new FormControl(''),
      remark : new FormControl(''),
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
      this.rmLeadService.getLeadsByUserInput(inputText,"Visit",this.id).subscribe((response : any) => {
          if(response.results.length != 0){
            this.assignedLeadResData = response.results;
            this.totalLeads = response.results.length;
            this.historyList = response.results[0].history;
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
