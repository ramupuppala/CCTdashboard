import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { BehaviorSubject } from 'rxjs';
import { HttpCallService } from './http-service';

@Injectable(
)
export class UserService {

  constructor(private httpClient: HttpClient, private httpCallService: HttpCallService) { }

  private header = new BehaviorSubject<boolean>(false);
  headerNav = this.header.asObservable();

  doLoggedIn() {
    this.header.next(true);
  }
  doLogin(loginData) {
    const url = environment.api_endpoint + '/v1/user-login/';    
    return this.httpCallService.httpCallLogin(url,"post",loginData);
  }
  getDashboardAppData() {   
    const url = environment.api_endpoint + '/v1/app/';
    return this.httpCallService.httpCall(url,"post",{});
  }



}