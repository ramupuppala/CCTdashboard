import { Component, OnInit } from '@angular/core';
import { UserService } from "./services/user-service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  header: boolean;
  constructor(private service: UserService,private router: Router) { }
  ngOnInit() {
    console.log(this.service.headerNav)
    this.service.headerNav.subscribe(header => this.header = header);
    if (localStorage.getItem('x-access-token')) {
      this.service.doLoggedIn();
        // this.router.navigate(['']);
   
    }
  }

  

}