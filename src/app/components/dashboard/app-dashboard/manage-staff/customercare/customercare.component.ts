import { Component, OnInit } from '@angular/core';
import { ManageStaffService } from '../../../../../services/manage-staff-service';
@Component({
  selector: 'app-customercare',
  templateUrl: './customercare.component.html',
  styleUrls: ['../manage.component.css']
})
export class CustomercareComponent implements OnInit {

  constructor(private manageStaffService:ManageStaffService) { }
  profiles:any;
  searchByName:String;
  ngOnInit() {
    this.manageStaffService.getGetCustomerCareDetails().then((data:any)=>{
      if(data.status){
        console.log(data);
        this.profiles=data.data;
        console.log(this.profiles)
      }
    })
  }
  searchForCustomercare(){
    this.manageStaffService.getSearchByCustomercare(this.searchByName).then((data:any)=>{
      if(data.status){
        console.log(data);
        this.profiles=data.data;
      }
    })
  }
  onChange(event){
    this.searchByName=event.target.value;
    console.log(this.searchByName);
    
  }
  cleareSearch(){
    this.searchByName="";
  }

}
