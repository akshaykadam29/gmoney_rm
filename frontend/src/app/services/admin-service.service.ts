import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddDesignation } from '../models/addDesignation';
import { AddUser } from '../models/addUser';
import { AssignHospital } from '../models/assignHospital';
import { AssignLeads } from '../models/assignLeads';


@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  url = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  saveUserDetails(userDetails : AddUser){
    return this.http.post(this.url + "/user/createRM", userDetails);
  }

  saveDesignationDetails(designationDetails : AddDesignation){
    return this.http.post(this.url + "/designation/createDesignation" , designationDetails);
  }

  getAllDesignationDetails(){
    return this.http.get(this.url + "/user/getAllDesignations");
  }

  getUserById(id: any){
    return this.http.get(this.url + `/user/getUserById/${id}`)
  }

 //Center component Api Call
  getAllUnassignedCenter(){
    return this.http.get(this.url + '/assignHospital/getAllHospitals');
  }

  getAssignedCenter(){
    return this.http.get(this.url + '/assignHospital/getAssignedHospital');
  }

  getInactiveCenter(){
    return this.http.get(this.url + '/assignHospital/getInactiveHospital');
  }

  assignCenterToUser(assignHospitalDetails : AssignHospital){
    return this.http.post(this.url + '/assignHospital/assignHospitalToUser' , assignHospitalDetails);
  }

 //Leads component Api Calls
  getTotalLeadCount(){
    return this.http.get(this.url + '/leads/getTotalLeadCount');
  }
  
  getAllUnassignLead(){
    return this.http.get(this.url + '/leads/getAllUnassignLead');
  }

  getAllAssignLead(){
    return this.http.get(this.url + '/leads/getAllAssignLead');
  }

  getAllOnboardedLead(){
    return this.http.get(this.url + '/leads/getAllOnboardedLead');
  }

  getAllDataSourceData(dataParam : any){
    return this.http.get(this.url + `/leads/getAllDataSourceData/${dataParam}`);
  }

  saveAllLeads(leadData : any){
    return this.http.post(this.url + '/leads/saveAllLeads', leadData);
  }

  assignLeadToUser(assignLeadDetails : AssignLeads){
    return this.http.post(this.url + '/leads/assignLeadToUser' , assignLeadDetails);
  }

// Common Api Calls for Centre,Lead
  getUserByText(userInputNew : string){
    const params = {
      userInput : userInputNew
    }
    return this.http.get(this.url + '/user/getUserByText', {params});
  }

  getDirectReportee(id: any){
    return this.http.get(this.url + `/common/getDirectReportee/${id}` )
  }

   // New Code
   getAllCenterDataSource(){
    return this.http.get(this.url + '/assignHospital/getAllHospitals');
  }

  getAllAssignedCenterDataSource(){
    return this.http.get(this.url + '/assignHospital/getAssignedHospital');
  }

  getLeadByUserSearchDataSource(inputText : any, componentType : any){
    return this.http.get(this.url + `/leads/getLeadByUserSearch/${inputText}/${componentType}`);
  }

  getCenterByUserSearchDataSource(inputText : any, componentType : any){
    return this.http.get(this.url + `/assignHospital/getCenterByUserSearch/${inputText}/${componentType}`);
  }
}

