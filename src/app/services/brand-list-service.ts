import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpCallService } from './http-service';
@Injectable(
)
export class BrandService {
    appId:string='';
    constructor(private httpClient: HttpClient, private httpCallService: HttpCallService) {
        this.appId=window.localStorage.getItem("app_id");
     }
    
     getBrandListData(brandName){
        const url = environment.api_endpoint + '/v2/brand/';
        return this.httpCallService.httpCall(url, "post", {
            "app_id":this.appId,
            "brandName":brandName,
            "limit":10,
            "skip":0
        });
       }
    
    createBrandList(data:any){
       
        const url = environment.api_endpoint + '/v1/brand/create/';
    
        return this.httpCallService.httpCall(url, "post",{
            "app_id":this.appId,
            "properties":data
        });
    }
    deleteBrandList(br_id:string){       
        const url = environment.api_endpoint + '/v1/brand/delete/';    
        return this.httpCallService.httpCall(url, "post",{
            "app_id":this.appId,
            "br_id":br_id
        });
    }

    getBrandListById(br_id:string){
        const url = environment.api_endpoint + '/v1/brand/get/';    
        return this.httpCallService.httpCall(url, "post",{
            "app_id":this.appId,
            "br_id":br_id
        });
    }
    updateBrandList(data:any){       
        const url = environment.api_endpoint + '/v1/brand/create/';    
        data.app_id=this.appId;
        return this.httpCallService.httpCall(url, "post",data);
    }
}