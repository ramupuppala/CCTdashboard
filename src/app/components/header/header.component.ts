import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _location: Location) { }
  username:string='';
  role:string='';
  ngOnInit() {
    this.username=window.localStorage.getItem('username');
    this.role=JSON.parse(window.localStorage.getItem('roles'));
    
  }

  backClicked() {
    this._location.back();
  }
  doLogout(){
    window.localStorage.clear();
    window.location.href="";
  }

}
