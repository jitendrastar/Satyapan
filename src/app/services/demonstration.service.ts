import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class DemonstrationService {

  constructor(public http:HttpClient, public baseService: CommonService) { }

  getFilterDropDownData(filterType,schemeID,subSchemeID,componentId,activityID,districtID){
      let credObj:any = new Object();
      credObj.obj = new Object();
      credObj.obj.usrnm = "rajkisan";
      credObj.obj.psw = "rajkisan@123";
      credObj.obj.srvnm = "Demonstration";
      credObj.obj.srvmethodnm = "GetFilterList";
      credObj.obj.srvparam = JSON.stringify({type: filterType,Scheme_ID:schemeID,SubScheme_ID:subSchemeID,ComponentId:componentId,ActivityId:activityID,DistrictId:districtID});
      let headers = new HttpHeaders();
      this.baseService.createAuthorizationHeader(headers);
      console.log("Data inserted = "+JSON.stringify(credObj));
      
      return this.http.post(this.baseService.baseURL + this.baseService.client_id, credObj, {
        headers: headers,
      });
    
  }

  getMBSYFilterDropDownData(filterType,schemeID,subSchemeID,componentId,activityID,districtID){
    let credObj:any = new Object();
    credObj.obj = new Object();
    credObj.obj.usrnm = "rajkisan";
    credObj.obj.psw = "rajkisan@123";
    credObj.obj.srvnm = "MBSY";
    credObj.obj.srvmethodnm = "GetFilterList";
    credObj.obj.srvparam = JSON.stringify({type: filterType,Scheme_ID:schemeID,SubScheme_ID:subSchemeID,ComponentId:componentId,ActivityId:activityID,DistrictId:districtID});
    let headers = new HttpHeaders();
    this.baseService.createAuthorizationHeader(headers);
    console.log("Data inserted = "+JSON.stringify(credObj));
    
    return this.http.post(this.baseService.baseURL + this.baseService.client_id, credObj, {
      headers: headers,
    });
  
}

  getFinancialYrList(){
    let credObj:any = new Object();
    credObj.obj = new Object();
    credObj.obj.usrnm = "rajkisan";
    credObj.obj.psw = "rajkisan@123";
    credObj.obj.srvnm = "Demonstration";
    credObj.obj.srvmethodnm = "GetFinancialYear";
    credObj.obj.srvparam = JSON.stringify({});
    let headers = new HttpHeaders();
    this.baseService.createAuthorizationHeader(headers);
    console.log("Data inserted = "+JSON.stringify(credObj));
    
    return this.http.post(this.baseService.baseURL + this.baseService.client_id, credObj, {
      headers: headers,
    });
}

getSearchResult(credObj){
  let headers = new HttpHeaders();
  this.baseService.createAuthorizationHeader(headers);
  console.log("Data inserted = "+JSON.stringify(credObj));
  
  return this.http.post(this.baseService.baseURL + this.baseService.client_id, credObj, {
    headers: headers,
  });
}
}
