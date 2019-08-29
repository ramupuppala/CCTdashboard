import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpCallService } from './http-service';
@Injectable(
)
export class GeoZoneListService {
    appId:string='';
    constructor(private httpClient: HttpClient, private httpCallService: HttpCallService) {
        this.appId=window.localStorage.getItem("app_id");
     }
    
     getGeoZoneListData(data){
        const url = environment.api_endpoint + '/v2/geo-zone/';
        data.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", data);
       }
    
  
}