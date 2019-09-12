import { Component, OnInit } from '@angular/core';
import { StoreListService } from '../../../../../../services/store-list-service';
import {ActivatedRoute,Router} from '@angular/router';
@Component({
  selector: 'app-assign-manager',
  templateUrl: './assign-manager.component.html',
  styleUrls: ['./assign-manager.component.css']
})
export class AssignManagerComponent implements OnInit {

  constructor(private storeService:StoreListService,private route:ActivatedRoute,private router:Router) { }
  st_id="";
  managerProfiles=[]
  ngOnInit() {
    this.st_id=this.route.snapshot.paramMap.get('st_id'); 
    this.getManagerProfile()
  }

  getManagerProfile(){
    this.storeService.getStoreProfileDetails("/v1/profile/store-manager/").then((response:any)=>{
      if(response.status){
        this.managerProfiles=response.data;
        console.log(this.managerProfiles)
      }
    })
  }

  assignStoreManager(p_id){
    this.storeService.assignStoreProfile({
      p_id,
      st_id:this.st_id
    },"/v1/profile/store-manager/assign-store/").then((response:any)=>{
      if(response.status){
        alert("sucessfully assigned to store");
      }
    })
  }

}
