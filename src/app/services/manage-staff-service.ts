import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable(
)
export class ManageStaffService {

    constructor(private httpClient: HttpClient) { }
    
    getGetCustomerCareDetails() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json;charset=UTF-8',
                'x-access-token': window.localStorage.getItem("x-access-token"),
                'refresh_token': window.localStorage.getItem("x-refresh-token"),
                
            })
        };
        const url = environment.api_endpoint + '/v2/profile/customer-care-admin/';
        const appId = window.localStorage.getItem("app_id")
        return this.httpClient.post(url, { app_id: appId ,username:"",skip:0,limit:10}, httpOptions).toPromise();
    } 
    getGetStoreManagerDetails() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json;charset=UTF-8',
                'x-access-token': window.localStorage.getItem("x-access-token"),
                'refresh_token': window.localStorage.getItem("x-refresh-token"),
                
            })
        };
        const url = environment.api_endpoint + '/v2/profile/store-manager/';
        const appId = window.localStorage.getItem("app_id")
        return this.httpClient.post(url, { app_id: appId ,username:"",skip:0,limit:10}, httpOptions).toPromise();
    } 
    getSearchByCustomercare(username:String) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json;charset=UTF-8',
                'x-access-token': window.localStorage.getItem("x-access-token"),
                'refresh_token': window.localStorage.getItem("x-refresh-token"),
                
            })
        };
        const url = environment.api_endpoint + '/v2/profile/customer-care-admin/';
        const appId = window.localStorage.getItem("app_id")
        return this.httpClient.post(url, { app_id: appId ,username:username,skip:0,limit:10}, httpOptions).toPromise();
    } 
    getSearchByStoreManager(username:String) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json;charset=UTF-8',
                'x-access-token': window.localStorage.getItem("x-access-token"),
                'refresh_token': window.localStorage.getItem("x-refresh-token"),
                
            })
        };
        const url = environment.api_endpoint + '/v2/profile/store-manager/';
        const appId = window.localStorage.getItem("app_id")
        return this.httpClient.post(url, { app_id: appId ,username:username,skip:0,limit:10}, httpOptions).toPromise();
    } 
 

}