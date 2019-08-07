import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'


@Injectable(
)
export class LoyalityService {

    constructor(private httpClient: HttpClient) { }

    getLoyalityList() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
                'x-access-token': window.localStorage.getItem("x-access-token"),
                'refresh_token': window.localStorage.getItem("x-refresh-token")
            })
        };
        const url = environment.api_endpoint + '/v2/list-loyality';
        const appId = window.localStorage.getItem("app_id")
        return this.httpClient.post(url, { appId: appId }, httpOptions).toPromise();
    }
    createLoyalityList(data: any) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
                'x-access-token': window.localStorage.getItem("x-access-token"),
                'refresh_token': window.localStorage.getItem("x-refresh-token")
            })
        };
        const url = environment.api_endpoint + '/v2/loyality';
        const appId = window.localStorage.getItem("app_id");
        data.appId = appId;
        console.log(data)
        return this.httpClient.post(url, data, httpOptions).toPromise();
    }
    changeActiveState(data: any) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
                'x-access-token': window.localStorage.getItem("x-access-token"),
                'refresh_token': window.localStorage.getItem("x-refresh-token")
            })
        };
        const url = environment.api_endpoint + '/v2/delete-attribute';
        const appId = window.localStorage.getItem("app_id");
        data.appId = appId;
        return this.httpClient.post(url, data, httpOptions).toPromise();
    }
    getLabel(label: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
                'x-access-token': window.localStorage.getItem("x-access-token"),
                'refresh_token': window.localStorage.getItem("x-refresh-token")
            })
        };
        const url = environment.api_endpoint + '/v2/get-by-label';
        const appId = window.localStorage.getItem("app_id");
        return this.httpClient.post(url,
            {
                label: label,
                appId: appId
            }, httpOptions).toPromise();
    }
    editLoyalityList(data: any) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
                'x-access-token': window.localStorage.getItem("x-access-token"),
                'refresh_token': window.localStorage.getItem("x-refresh-token")
            })
        };
        const url = environment.api_endpoint + '/v2/update-attribute';
        const appId = window.localStorage.getItem("app_id");
        data.appId=appId;
        return this.httpClient.post(url, data, httpOptions).toPromise();
    }

}