import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  username: string = '';
  role: string = '';
  ngOnInit() {
    this.username = window.localStorage.getItem('username');
    this.role = JSON.parse(window.localStorage.getItem('roles'));
  }

  backClicked() {
    window.history.back();
  }
  doLogout() {
    window.localStorage.clear();
    window.location.href = "";
  }

}
