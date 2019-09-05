import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpCallService } from './http-service';
@Injectable(
)
export class StoreListService {
    appId: string = '';
    constructor(private httpClient: HttpClient, private httpCallService: HttpCallService) {
        this.appId = window.localStorage.getItem("app_id");
    }

    getCountry() {
        const url = environment.api_endpoint + '/v1/dropdowns/countries/';
        return this.httpCallService.httpCall(url, "post", {});
    }
    getEngagementStores() {
        const url = environment.api_endpoint + '/v1/engagement-zone-for-dropdown/';
        return this.httpCallService.httpCall(url, "post", {app_id:this.appId});
    }

    getAppStore(data){
        const url = environment.api_endpoint + '/v2/app-store/';
        data.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", data);
    }

    getState(data) {
        const url = environment.api_endpoint + '/v1/dropdowns/states/';
        return this.httpCallService.httpCall(url, "post", {app_id:this.appId,country:data});
    }
    getCity(data) {
        const url = environment.api_endpoint + '/v1/dropdowns/cities-for-state/';
        data.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", data);
    }
    searchForStoreList(payload,payloadUrl){
        const url = environment.api_endpoint + payloadUrl;
        payload.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", payload);
    }

    searchEzone(data){
        const url = environment.api_endpoint + '/v1/store/';
        data.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", data);
    }
}