import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable(
)
export class BroadcastNotificationService {

    constructor(private httpClient: HttpClient) { }
    
    getGeoZone() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json;charset=UTF-8',
                'x-access-token': window.localStorage.getItem("x-access-token"),
                'refresh_token': window.localStorage.getItem("x-refresh-token"),
                
            })
        };
        const url = environment.api_endpoint + '/v1/geo-zone-for-dropdown/';
        const appId = window.localStorage.getItem("app_id")
        return this.httpClient.post(url, { app_id: appId }, httpOptions).toPromise();

    }
    getEzone(data:string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json;charset=UTF-8',
                'x-access-token': window.localStorage.getItem("x-access-token"),
                'refresh_token': window.localStorage.getItem("x-refresh-token"),
                
            })
        };
        const url = environment.api_endpoint + '/v1/get-engagement-zone-for-geozone/';
        const appId = window.localStorage.getItem("app_id")
        return this.httpClient.post(url, { 
            app_id: appId,
            geozone_name:data
         }, httpOptions).toPromise();

    }
    createZoneNofifications(data:any) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json;charset=UTF-8',
                'x-access-token': window.localStorage.getItem("x-access-token"),
                'refresh_token': window.localStorage.getItem("x-refresh-token"),
                
            })
        };
        const url = environment.api_endpoint + '/v2/sns/broadcastNotification/';
        data.app_id = window.localStorage.getItem("app_id");
        return this.httpClient.post(url, data ,httpOptions).toPromise();

    }

}