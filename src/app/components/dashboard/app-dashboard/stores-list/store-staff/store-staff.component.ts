import { Component, OnInit } from '@angular/core';
import { StoreListService } from '../../../../../services/store-list-service';
import {ActivatedRoute,Router} from '@angular/router';
@Component({
  selector: 'app-store-staff',
  templateUrl: './store-staff.component.html',
  styleUrls: ['../stores-list.component.css']
})
export class StoreStaffComponent implements OnInit {

  constructor(private storeService:StoreListService,private route:ActivatedRoute,private router:Router) { }
  st_id="";
  managerProfiles=[];
  customerCareAdminProfiles = [];
  ngOnInit() {
    this.st_id=this.route.snapshot.paramMap.get('st_id');
    this.getCustomers();
    this.getManagers();
  }
  getCustomers(){
    this.storeService.getProfileDetails({
      st_id:this.st_id
    },"/v1/store/get/customer-care-admin/").then((response:any)=>{
      if(response.status){
        this.customerCareAdminProfiles=response.data;
      }
    })
  }
  getManagers(){
    this.storeService.getProfileDetails({
      st_id:this.st_id
    },"/v1/store/get/manager/").then((response:any)=>{
      if(response.status){
        this.managerProfiles=response.data;
      }
    })
  }
  removeManagerProfile(p_id){
    this.storeService.removeProfile({
      p_id,
      st_id:this.st_id
    },"v1/profile/store-manager/remove-store/").then((response:any)=>{
      if(response.status){
        this.getManagers();
      }
    })
  }
  removeCustomerProfile(p_id){
    this.storeService.removeProfile({
      p_id,
      st_id:this.st_id
    },"/v1/profile/customer-care-admin/remove-store/").then((response:any)=>{
      if(response.status){
        this.getCustomers();
      }
    })
  }
}
