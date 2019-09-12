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
    updateLoaction(data){
        const url = environment.api_endpoint + '/v1/store/update-location/';
        data.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", data)
    }
    deleteStore(data,dataUrl){
        const url = environment.api_endpoint + dataUrl;
        data.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", data)
    }
    getStoreNotifications(data){
        const url = environment.api_endpoint + '/v2/store/notification/';
        data.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", data)
    }
    getStore(data,dataUrl){
        const url = environment.api_endpoint + dataUrl;
        data.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", data)
    }
    getProfileDetails(data,dataUrl){
        const url = environment.api_endpoint + dataUrl;
        data.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", data)
    }

    activeFlag(data){
        const url = environment.api_endpoint + "/v2/app-store/activeflag/";
        data.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", data)
    }

    assignEngagementzone(data,dataUrl){
        const url = environment.api_endpoint + dataUrl;
        data.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", data)
    }

    getBrands(){
        const url = environment.api_endpoint + '/v1/brand/';
        return this.httpCallService.httpCall(url, "post", {app_id:this.appId});
    }

    assignBrands(data){
        const url = environment.api_endpoint + "/v1/store/assign-brand/";
        data.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", data)
    }

    removeBrand(data){
        const url = environment.api_endpoint + "/v1/store/remove-brand/";
        data.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", data)
    }

    removeProfile(data,dataUrl){
        const url = environment.api_endpoint + dataUrl;
        data.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", data)
    }

    getStoreProfileDetails(dataUrl){
        const url = environment.api_endpoint + dataUrl;
        return this.httpCallService.httpCall(url, "post", {app_id:this.appId} );
    }

    
  assignStoreProfile(data,dataUrl){
    const url = environment.api_endpoint + dataUrl;
    data.app_id=this.appId;
    return this.httpCallService.httpCall(url, "post", data)
}
}