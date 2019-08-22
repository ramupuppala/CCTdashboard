import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpCallService } from './http-service';
@Injectable(
)
export class ProfileListService {
    appId:string='';
    username:string="";
    constructor(private httpClient: HttpClient, private httpCallService: HttpCallService) {
        this.appId=window.localStorage.getItem("app_id");
        this.username=window.localStorage.getItem("username");
     }
    
   getProfileData(data:any){
    const url = environment.api_endpoint + '/v2/profile/';
    data.app_id=this.appId;
    return this.httpCallService.httpCall(url, "post", data);
   }

   updateCandidate(data:any){
    const url = environment.api_endpoint + '/v1/user-update-customer-id';
    return this.httpCallService.httpCall(url, "post", {
        'app_id':this.appId,'p_id':data.p_id,'customer_id':data.customer_id,username:this.username
    });
   }

   getBusinessEntityRoles(){
    const url = environment.api_endpoint + '/v1/get-business-entity-roles/';
    return this.httpCallService.httpCall(url, "post", {});
   }

   getProfileLabel(){
    const url = environment.api_endpoint + '/v2/get-profile-label';
    return this.httpCallService.httpCall(url, "post", {appId:this.appId});
   }

   createProfileList(data:any){
    const url = environment.api_endpoint + '/v2/profile/create/';
    data.app_id=this.appId;
    return this.httpCallService.httpCall(url, "post", data);
   }
   editProfileList(data:any){
    const url = environment.api_endpoint + '/v2/profile/update/';
    data.app_id=this.appId;
    return this.httpCallService.httpCall(url, "post", data);
   }

   deleteProfileList(p_id:string){
    const url = environment.api_endpoint + '/v1/profile/delete/';
    
    return this.httpCallService.httpCall(url, "post", {
        app_id:this.appId,
        p_id:p_id
    });
   }

   getProfileListForUpdate(p_id:string){
    const url = environment.api_endpoint + '/v2/profile/get/';    
    return this.httpCallService.httpCall(url, "post", {
        app_id:this.appId,
        p_id:p_id
    });
   }

   deleteRole(data:any){
    const url = environment.api_endpoint + '/v2/profile/remove-role/';    
    return this.httpCallService.httpCall(url, "post", data);
   }

   userRegistration(data){
    const url = environment.api_endpoint + '/v1/user-registration/';    
    return this.httpCallService.httpCall(url, "post", data);
   }
}