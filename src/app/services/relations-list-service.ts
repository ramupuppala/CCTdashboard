import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpCallService } from './http-service';
@Injectable(
)
export class RelationsListService {
    appId:string='';
    constructor(private httpClient: HttpClient, private httpCallService: HttpCallService) {
        this.appId=window.localStorage.getItem("app_id");
     }
    
     getRelationsListData(){
        const url = environment.api_endpoint + '/v1/business-entity/get/relation-config/';
        return this.httpCallService.httpCall(url, "post", {});
       }  
}