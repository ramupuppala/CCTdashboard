import { Component, OnInit } from '@angular/core';
import { ProfileListService } from '../../../../services/profile-list-service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {

  constructor( private profileListService:ProfileListService) { }
  profiles=[];
  profileListData:any={
    customer_id:"",
    limit:10,
    role:"",
    searchkey:"",
    skip:0,
    username:""
  }
  getProfileList(){
    this.profileListService.getProfileData(this.profileListData).then(((response: any) => {
      if (response.status) {
        this.profiles = response.data;
        console.log(this.profiles)
      }
    }));
  }
  ngOnInit() {
    this.getProfileList();
  }
  onChangeBySelect(event){
    this.profileListData.searchkey=event.target.value;
  }
  onChangeByInput(event){
    this.profileListData.customer_id=event.target.value;
    this.profileListData.role=event.target.value;
    this.profileListData.username=event.target.value;   
    
  }
 
  checkRole(profile:any, roleName) {
    if(!profile.roles){
      return false;
    }
    return profile.roles.some(function(el) {
      return el.name === roleName;
    });
  }
  deleteProfileList(p_id:string){
    this.profileListService.deleteProfileList(p_id).then(((response: any) => {
      if (response.status) {
        this.getProfileList();
      }
    }));
  }
  clear(){
    this.profileListData={
      customer_id:"",
      limit:10,
      role:"",
      searchkey:"",
      skip:0,
      username:""
    }
    this.getProfileList();
  }
}
