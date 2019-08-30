import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable(
    
)
export class HttpCallService {
    public httpOptions={};
    constructor(private httpClient: HttpClient) {
      this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
                'x-access-token': window.localStorage.getItem("x-access-token"),
                'refresh_token': window.localStorage.getItem("x-refresh-token")
            })
        };
     }

    httpCall(url:string,method:string,data?:any){
        return this.httpClient[method](url, data, this.httpOptions).toPromise();
    }

    httpCallLogin(url:string,method:string,data?:any){
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
          };
        return this.httpClient.post(url, data,httpOptions).toPromise();
    }
  
    httpLocation(url){
      return this.httpClient.get(url).toPromise();
    }
}