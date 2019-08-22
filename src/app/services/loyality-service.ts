import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { HttpCallService } from './http-service';

@Injectable(
)
export class LoyalityService {
    appId:string="";
    constructor(private httpClient: HttpClient,private httpCallService:HttpCallService) {  
        this.appId=window.localStorage.getItem("app_id");
     }

    getLoyalityList() {     
        const url = environment.api_endpoint + '/v2/list-loyality';
        const appId =this.appId;        
        return this.httpCallService.httpCall(url,"post",{appId});
    }
    createLoyalityList(data: any) {
        const url = environment.api_endpoint + '/v2/loyality';        
        data.appId = this.appId;
        return this.httpCallService.httpCall(url,"post",data);
    }
    changeActiveState(data: any) {        
        const url = environment.api_endpoint + '/v2/delete-attribute';
        data.appId = this.appId;
        return this.httpCallService.httpCall(url,"post",data);
    }
    getLabel(label: string) {        
        const url = environment.api_endpoint + '/v2/get-by-label';  
            return this.httpCallService.httpCall(url,"post",{
                label: label,
                appId: this.appId
            });
    }
    editLoyalityList(data: any) {        
        const url = environment.api_endpoint + '/v2/update-attribute';
        data.appId=this.appId;
        return this.httpCallService.httpCall(url,"post",data);
    }

}