import { Component, OnInit } from '@angular/core';
import { ManageStaffService } from '../../../../../services/manage-staff-service';
@Component({
  selector: 'app-storemanager',
  templateUrl: './storemanager.component.html',
  styleUrls: ['../manage.component.css']
})
export class StoremanagerComponent implements OnInit {

  constructor(private manageStaffService:ManageStaffService) { }
  profiles:any;
  searchByName:String;
  ngOnInit() {
    this.manageStaffService.getGetStoreManagerDetails().then((data:any)=>{
      if(data.status){
        console.log(data);
        this.profiles=data.data;
        console.log(this.profiles)
      }
    })
  }
  searchForStoreManagement(){
    console.log(this.searchByName);
    this.manageStaffService.getSearchByStoreManager(this.searchByName).then((data:any)=>{
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
