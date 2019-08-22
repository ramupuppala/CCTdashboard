import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ProfileListService } from '../../../../../services/profile-list-service';
@Component({
  selector: 'app-create-profile-list',
  templateUrl: './create-profile-list.component.html',
  styleUrls: ['./create-profile-list.component.css']
})
export class CreateProfileListComponent implements OnInit {

  public profileListData: FormGroup;
  public submitted = false;
  public roleDate = [];
  public loyaltyLabel = [];
  public role={};
  public profileListDetails = {
    "profileList": {
      "username": "",
      "password": "",
      "location": "",
      "notificationToken": "",
      "role": "",
      "loyaltyLabel": ""
    }
  }

  public errorMsg: boolean = false;
  constructor(private router: Router, private fb: FormBuilder, private profileListService: ProfileListService) {
    this.profileListData = this.fb.group({
      "profileList": this.fb.group({
        "username": ["", Validators.required],
        "password": ["", Validators.required],
        "location": [""],
        "name": [""],
        "notificationToken": [""],
        "role": [{}, Validators.required],
        "loyaltyLabel": [""],
      })
    });
  }
  ngOnInit() {
    this.profileListService.getBusinessEntityRoles().then(((response: any) => {
      if (response.status) {
        this.roleDate = response.data;
        this.profileListService.getProfileLabel().then(((data: any) => {
          console.log(data)

          if (data.status) {
            let records = data.message.records || [];
            records.forEach(record => {
              this.loyaltyLabel.push(record._fields[0]);
            });
            console.log("sdfsdfsd", this.loyaltyLabel);


          }
        }));
      }
    }));

  }
  public fieldInput() {
    this.errorMsg = false;
  }

  changeRole(role:object){
    console.log(role);
  }

  public createprofileList() {
    let profileListData = {
      labels: this.profileListData.controls.profileList.value.loyaltyLabel,
      name: this.profileListData.controls.profileList.value.loyaltyLabel,
      password: this.profileListData.controls.profileList.value.password,
      properties: {
        location: this.profileListData.controls.profileList.value.location,
        notification_token: this.profileListData.controls.profileList.value.notificationToken,
        name: this.profileListData.controls.profileList.value.name,
      },
      role: this.profileListData.controls.profileList.value.role,
      username: this.profileListData.controls.profileList.value.username
    };
    this.profileListService.createProfileList(profileListData).then(((response: any) => {
      let appId=window.localStorage.getItem("app_id");
      var appName = sessionStorage.getItem("appName");
      console.log(appId,appName)
      this.router.navigate(['app-dashboard/',appId,appName]);
    }));

  }

 
}
