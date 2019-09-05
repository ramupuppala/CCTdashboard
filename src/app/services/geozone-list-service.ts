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
    
    findLocation(location){
          // const google_map_api_key = 'AIzaSyBFaOsUx42A4_EJopMIZZZmq4N1UyRE69Y';
          const google_map_api_key = 'AIzaSyBWx06oZ1qYEP3OLaiY-yEaTEHQ_a9nUPA';
          console.log('Getting city state from location coordinates...');
          return this.httpCallService.httpLocation(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.replace(' ', '')}&key=${google_map_api_key}`)
    }
    getAllCountryStateCity(){
        const url = environment.api_endpoint + '/v1/dropdowns/get-all-city-state-country/';
        return this.httpCallService.httpCall(url, "post", {});
    }
    createGeozoneList(data){
        const url = environment.api_endpoint + '/v1/geo-zone/create/';
        data.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", data);
    }

    getGeozoneListDataById(g_id:string){
        const url = environment.api_endpoint + '/v1/geo-zone/get/';        
        return this.httpCallService.httpCall(url, "post", {
            app_id:this.appId,
            g_id:g_id
        });
    }

    updateGeozoneList(data){
        const url = environment.api_endpoint + '/v1/geo-zone/update';
        data.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", data);
    }

    getEngagementList(g_id:string){
        const url = environment.api_endpoint + '/v1/engagement-zone/';
        return this.httpCallService.httpCall(url, "post", {
            app_id:this.appId,
            g_id:g_id
        });
    }

    getGeozoneNotification(g_id:string){
        const url = environment.api_endpoint + '/v1/geozone/notification/';
        return this.httpCallService.httpCall(url, "post", {
            app_id:this.appId,
            g_id:g_id
        });
    }

    createEngagementZoneList(payload:any,payloadUrl){
        const url = environment.api_endpoint + payloadUrl;
        payload.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", payload);
    }

    getEngagementzoneById(data){
        const url = environment.api_endpoint + '/v1/engagement-zone/get/';
        data.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", data);
    }
    deleteEngagementzoneById(data){
        const url = environment.api_endpoint + '/v1/engagement-zone/delete/';
        data.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", data);
    }

    removeGeoNodification(data){
        const url = environment.api_endpoint + '/v1/drilled-down-notification/delete/';
        data.app_id=this.appId;
        data.st_id=null;
        return this.httpCallService.httpCall(url, "post", data);
    }

    createGeoNotification(payload:any,payloadUrl){
        const url = environment.api_endpoint + payloadUrl;
        payload.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", payload);
    }

    getGeoNotificationListById(data){
        const url = environment.api_endpoint + '/v1/app/notification-for-edit/';
        data.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", data)
    }
    getGeoStore(data){
        const url = environment.api_endpoint + '/v1/store/';
        data.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", data)
    }

    updateLoaction(data){
        const url = environment.api_endpoint + '/v1/store/update-location/';
        data.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", data)
    }

    deleteGeoStore(data){
        const url = environment.api_endpoint + '/v1/store/delete/';
        data.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post", data)
    }
}