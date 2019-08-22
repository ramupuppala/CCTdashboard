import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpCallService } from './http-service';

@Injectable(
)
export class ManageStaffService {
    appId:string='';
    pId:string='';
    constructor(private httpClient: HttpClient, private httpCallService: HttpCallService) { 
        this.appId=window.localStorage.getItem("app_id");
        this.pId=window.localStorage.getItem("p_id");
    }
    
    getGetCustomerCareDetails() {      
        const url = environment.api_endpoint + '/v2/profile/customer-care-admin/';
        return this.httpCallService.httpCall(url, "post",  { app_id: this.appId ,username:"",skip:0,limit:10});
    } 
    getGetStoreManagerDetails() {
        const url = environment.api_endpoint + '/v2/profile/store-manager/';
        return this.httpCallService.httpCall(url, "post",  { app_id: this.appId ,username:"",skip:0,limit:10});
    } 
    getSearchByCustomercare(username:String) {      
        const url = environment.api_endpoint + '/v2/profile/customer-care-admin/';
        return this.httpCallService.httpCall(url, "post",  { app_id: this.appId ,username:username,skip:0,limit:10});        
    } 
    getSearchByStoreManager(username:String) {       
        const url = environment.api_endpoint + '/v2/profile/store-manager/';
        return this.httpCallService.httpCall(url, "post",  { app_id: this.appId ,username:username,skip:0,limit:10});       
    } 
    getEzoneStoresForCustomercare() {       
        const url = environment.api_endpoint + '/v1/all-store/';
        return this.httpCallService.httpCall(url, "post",  { app_id: this.appId});       
    } 

    assignStore(data:any){
        const url = environment.api_endpoint + '/v1/profile/customer-care-admin/assign-store/';
        return this.httpCallService.httpCall(url, "post",  { 'app_id': this.appId, 'p_id': data.p_id, 'st_id':  data.id}); 
    }
    getAssignedStoreListCustomercare(p_id:string) {       
        const url = environment.api_endpoint + '/v1/profile/customer-care-admin/get-assigned-store/';
        return this.httpCallService.httpCall(url, "post",  { app_id: this.appId,'p_id': p_id});       
    } 

    unSubscribeToStore(data:any){
        console.log(data);
        const url = environment.api_endpoint + '/v1/profile/customer-care-admin/remove-store';
        return this.httpCallService.httpCall(url, "post",  { 'app_id': this.appId, 'p_id': data.p_id, 'st_id':  data.id}); 
    }


 

}