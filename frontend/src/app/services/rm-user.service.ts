import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RmUserService {
  url = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getAllAssignedHopitalById(id: any, tab : Number){
    return this.http.get(this.url + `/application/getAllAssignedHopitalById/${tab}/${id}`);
  }

  getAllApplicationByHospId(id : any, tab : string){
    return this.http.get(this.url + `/application/getAllApplicationByHospId/${tab}/${id}`) ;
  }

  uploadImageToS3(data: any){
    return this.http.post(this.url + '/common/uploadFile', data);
  }

  getAllImagesById(id: any){
    return this.http.get(this.url+ `/center/getAllImageById/${id}`);
  }

  getAllDirectReporteeHospitalById(id:any, tab : Number){
    return this.http.get(this.url + `/application/getAllDirectReporteeHospitalById/${tab}/${id}`);
  }

  getAllDirectReporteeApplicationById(id:any, tab : any){
    return this.http.get(this.url + `/application/getAllDirectReporteeApplicationById/${tab}/${id}`);
  }

  //Service API for Claim Tab
  getAllUnClaimedHospitalsCount(){
    return this.http.get(this.url + '/claim/getAllUnClaimedHospitalsCount');
  }

  getAllClaimedHospitalsCount(){
    return this.http.get(this.url  + '/claim/getAllClaimedHospitalsCount')
  }

  getAllClaimedHospitalsCountByRmId(id : any){
    return this.http.get(this.url + `/claim/getAllClaimedHospitalsCountByRmId/${id}`)
  }

  getAllSchemeApprovalPendingcount(){
    return this.http.get(this.url + '/claim/getAllSchemeApprovalPendingcount');
  }

  getAllHospitalsByCliamTabs(tabValue : string, rmidValue : any){
    var params = {
      tab : tabValue,
      rmId : rmidValue
    }
    return this.http.get(this.url + `/claim/getAllHospitalsByCliamTabs`,{params})
  }

  setHospitalClaimedByRm(hospitalObjId : any, rmObjId : any, tabValue : any){
    var body ={
      hospId : hospitalObjId,
      rmId : rmObjId,
      tab : tabValue
    }
    return this.http.post(this.url + `/claim/setHospitalClaimedByRm`, body);
  }

  getAllPolicySchemes(){
    return this.http.get(this.url + '/claim/getAllPolicySchemes');
  }

  getAllNonPolicySchemes(){
    return this.http.get(this.url + '/claim/getAllNonPolicySchemes');
  }

  getRmLeadsEffortById(rmId : any){
    return this.http.get(this.url + `/effort/getRmLeadsEffortById/${rmId}`);
  }

  saveSchemeSelectedByRm(schemesData : any){
    return this.http.post(this.url + '/claim/saveSchemeSelectedByRm', schemesData);
  }

  updateApprovedSchemeInHospital(schemeId : any){
    var body ={
      schemeId : schemeId,
    }
    return this.http.post(this.url + '/claim/updateApprovedSchemeInHospital',body);
  }

  updateHospitalClaimDispute(rmUserId : any, hospitalId : any){
    var body ={
      userId : rmUserId.userId[0],
      hospId : hospitalId
    }
    return this.http.post(this.url + '/claim/updateHospitalClaimDispute', body);
  }

  getLeaderByNationalRanking(){
    return this.http.get(this.url + '/leader/getLeaderByNationalRanking');
  }

  getLeaderByRegionalRanking(){
    return this.http.get(this.url + '/leader/getLeaderByRegionalRanking');
  }
}
