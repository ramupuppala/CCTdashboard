import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  appData:any;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getDashboardAppData().then(((data: any) => {    
      if (data.status) {
        console.log(data.data);
        this.appData=data.data;
      }
    }));
  }
  

}