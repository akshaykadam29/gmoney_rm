import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Lead } from '../models/lead';

@Injectable({
  providedIn: 'root'
})
export class RmLmsService {

  url = environment.apiUrl;
  
  constructor(private http : HttpClient) { }

  // getRmAllLeadsById(id: any, tab : any){
  //   return this.http.get(this.url + `/leads/getRmAllLeadsById/${tab}/${id}`);
  // }

  getRmAllAssignedLeadsById(id:any, tab : string){
    return this.http.get(this.url + `/leads/getRmAllAssignedLeadsById/${id}/${tab}`);
  }

  saveLeadDetails(leadDetails : Lead){
    console.log(leadDetails)
    return this.http.post(this.url + '/leads/saveLeadDetails', leadDetails)
  }

  saveNewLeadDetails(rmid: any,leadDetails : Lead){
    console.log(leadDetails)
    return this.http.post(this.url + `/leads/saveNewLeadDetails/${rmid}`, leadDetails)
  }

  updateLeadDetails(leadDetails : Lead){
    console.log(leadDetails)
    return this.http.put(this.url + '/leads/updateLeadDetails', leadDetails)
  }

  getRmAllAppointments(id : any){
    return this.http.get(this.url + `/leads/getRmAllAppointments/${id}`)
  }

  getLeadsByUserInput(userInputNew : string, tabValue : string, rmId: any){
    const params = {
      userInput : userInputNew,
      tab : tabValue
    }
    return this.http.get(this.url + `/leads/getLeadsByUserInput/${rmId}`, {params});
  }
  
}
