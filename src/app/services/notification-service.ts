import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpCallService } from './http-service';
@Injectable(
)
export class NotificationsService {
    appId:string='';

    constructor(private httpClient: HttpClient, private httpCallService: HttpCallService) {
        this.appId=window.localStorage.getItem("app_id");
     }
    
     getNotificationsList(search_for:string){
        const url = environment.api_endpoint + '/v2/app/notification';
        return this.httpCallService.httpCall(url, "post", {
            "app_id":this.appId,
            "limit":10,
            "search_for":search_for,
            "skip":0
        });
       }  
    
    deleteNotificationList(nt_id:string){
        const url = environment.api_endpoint + '/v2/notification/delete/';
        return this.httpCallService.httpCall(url, "post", {
            "app_id":this.appId,
            "nt_id":nt_id,
        });
    }

    getCountry(){
        const url = environment.api_endpoint + '/v1/dropdowns/countries/';
        return this.httpCallService.httpCall(url, "post", {});
    }
    getState(country:string){
        const url = environment.api_endpoint + '/v1/dropdowns/states/';
        return this.httpCallService.httpCall(url, "post", {"country":country});
    }
    getCities(data){
        const url = environment.api_endpoint + '/v1/dropdowns/cities-for-state/';
        return this.httpCallService.httpCall(url, "post", data);
    }
    getZone(city:string){
        const url = environment.api_endpoint + '/v1/get-geo-zone-for-city/';
        return this.httpCallService.httpCall(url, "post", {city,app_id:this.appId});
    }
    getBrands(){
        const url = environment.api_endpoint + '/v1/brand-for-dropdown/';
        return this.httpCallService.httpCall(url, "post", {
            "app_id":this.appId,
        });
    }
    getEzones(geozone_name:string){
        const url = environment.api_endpoint + '/v1/get-engagement-zone-for-geozone/';
        return this.httpCallService.httpCall(url, "post", {
            "app_id":this.appId,
            geozone_name
        });
    }
    getStores(ezone_name: string){
        const url = environment.api_endpoint + '/v1/get-stores-for-ezone/';
        return this.httpCallService.httpCall(url, "post", {
            "app_id":this.appId,
            ezone_name
        });
    }    
   
    filterZeozoneStoreForNotification(data:any){
        const url = environment.api_endpoint + '/v1/filter-geozone-store-for-notification/';
        data.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post",data);
    }

    getProfileLabel(){
        const url = environment.api_endpoint + '/v2/get-profile-label';
        return this.httpCallService.httpCall(url, "post", {appId:this.appId});
    }
    getSelectedNotifiationType(){
        const url = environment.api_endpoint + '/v1/notification-types/get/';
        return this.httpCallService.httpCall(url, "post", {});
    }
    getActionNotifiationType(){
        const url = environment.api_endpoint + '/v1/notification-action-types/get/';
        return this.httpCallService.httpCall(url, "post", {});
    }
    saveNotificationList(data:any,payloadUrl){
        const url = environment.api_endpoint + payloadUrl;
        data.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", data);
    }

    notificationListData(data:{nt_id:string,search_for:string,app_id?:string}){
        const url = environment.api_endpoint + '/v2/app/notification-for-edit/';
        data.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", data); 
    }
   
    getUniqueBrands(data){
        const url = environment.api_endpoint + '/v1/stores/get-unique-brands/';
        data.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", data);
    }

    deleteStoreNotification(data){
        const url = environment.api_endpoint + '/v2/drilled-down-notification/delete/';
        data.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", data);
    }
}