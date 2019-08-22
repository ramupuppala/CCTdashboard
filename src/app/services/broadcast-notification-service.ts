import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpCallService } from './http-service';
@Injectable(
)
export class BroadcastNotificationService {
    appId:string='';
    constructor(private httpClient: HttpClient, private httpCallService: HttpCallService) {
        this.appId=window.localStorage.getItem("app_id");
     }
    
    getGeoZone() {
        const url = environment.api_endpoint + '/v1/geo-zone-for-dropdown/';
        return this.httpCallService.httpCall(url, "post", { app_id: this.appId });
    }
    getEzone(data: string) {
        const url = environment.api_endpoint + '/v1/get-engagement-zone-for-geozone/';
        return this.httpCallService.httpCall(url, "post", {
            app_id: this.appId,
            geozone_name: data
        });
    }
    createZoneNofifications(data: any) {
        const url = environment.api_endpoint + '/v2/sns/broadcastNotification/';
        data.app_id =this.appId;
        return this.httpCallService.httpCall(url, "post", data);
    }

}