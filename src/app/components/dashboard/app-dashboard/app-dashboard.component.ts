import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-app-dashboard',
  templateUrl: './app-dashboard.component.html',
  styleUrls: ['./app-dashboard.component.css']
})
export class AppDashboardComponent implements OnInit {
  id:string;
  appName:string;
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.appName = this.route.snapshot.paramMap.get('name');
    localStorage.setItem('app_id', this.id);
    sessionStorage.setItem("appName",this.appName );
  }

}
