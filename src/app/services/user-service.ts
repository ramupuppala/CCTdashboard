import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { BehaviorSubject } from 'rxjs';


@Injectable(
)
export class UserService {

    constructor(private httpClient: HttpClient) { }
    
    private header = new BehaviorSubject<boolean>(false);
    headerNav = this.header.asObservable();
  
    doLoggedIn(){
      this.header.next(true);
    }

    
     doLogin(loginData) {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
          };
        const url = environment.api_endpoint +'/v1/user-login/';
        return this.httpClient.post(url, loginData,httpOptions).toPromise();
    }
     getDashboardAppData() {
       console.log(window.localStorage.getItem("x-access-token"));
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json;charset=UTF-8',
              'x-access-token':window.localStorage.getItem("x-access-token"),
              'refresh_token' :window.localStorage.getItem("x-refresh-token")
            })
          };
        const url = environment.api_endpoint +'/v1/app/';
        return this.httpClient.post(url,{},httpOptions).toPromise();
    }
     


}