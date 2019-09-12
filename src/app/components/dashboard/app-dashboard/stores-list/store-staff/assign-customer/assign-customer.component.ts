import { Component, OnInit } from '@angular/core';
import { StoreListService } from '../../../../../../services/store-list-service';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-assign-customer',
  templateUrl: './assign-customer.component.html',
  styleUrls: ['./assign-customer.component.css']
})
export class AssignCustomerComponent implements OnInit {

  constructor(private storeService:StoreListService,private route:ActivatedRoute,private router:Router) { }
  st_id="";
  customerProfiles=[]
  ngOnInit() {
    this.st_id=this.route.snapshot.paramMap.get('st_id'); 
    this.getCustomerProfile()
  }

  getCustomerProfile(){
    this.storeService.getStoreProfileDetails("/v1/profile/customer-care-admin/").then((response:any)=>{
      if(response.status){
        this.customerProfiles=response.data;
      }
    })
  }

  assignStoreCustomer(p_id){
    this.storeService.assignStoreProfile({
      p_id,
      st_id:this.st_id
    },"/v1/profile/customer-care-admin/assign-store/").then((response:any)=>{
      if(response.status){
        alert("sucessfully assigned to store");
      }
    })
  }
}