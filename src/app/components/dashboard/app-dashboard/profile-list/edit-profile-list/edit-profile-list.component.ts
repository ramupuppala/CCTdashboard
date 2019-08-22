import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ProfileListService } from '../../../../../services/profile-list-service';
@Component({
  selector: 'app-edit-profile-list',
  templateUrl: './edit-profile-list.component.html',
  styleUrls: ['./edit-profile-list.component.css']
})
export class EditProfileListComponent implements OnInit {

  public profileListData: FormGroup;
  public p_id:string="";
  public submitted = false;
  public roleDate = [];
  public loyaltyLabel = [];
  public roles=[];
  profile_attributes:any;
  dynamic_form_model = {};
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
  constructor(private router: Router, private route: ActivatedRoute,private fb: FormBuilder, private profileListService: ProfileListService) {
    this.profileListData = this.fb.group({
      "profileList": this.fb.group({
        "username": [null, Validators.required],
        "password": ["", Validators.required],
        "location": [""],
        "name": [null],
        "notificationToken": [""],
        "role": [{}, Validators.required],
        "loyaltyLabel": [""],
      })
    });
    console.lo
  }
  ngOnInit() {
    this.p_id = this.route.snapshot.paramMap.get('p_id');
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

    this.profileListService.getProfileListForUpdate(this.p_id).then(((response: any) => {
      if (response.status) {
        console.log("response",response);
        let nameValue="e.g Anand";
        this.profile_attributes = response.data[0].profile_attributes;
        this.roles = response.data[0].roles;
        for(let i=0;i<this.profile_attributes.length;i++){
            if(this.profile_attributes[i].display_name == "Name"){
              nameValue=this.profile_attributes[i].value
            }
        }
        this.profileListData = this.fb.group({
          "profileList": this.fb.group({
            "username": [response.data[0].profile.username, Validators.required],
            "password": ["", Validators.required],
            "location": [""],
            "name": [nameValue],
            "notificationToken": [""],
            "role": [{}, Validators.required],
            "loyaltyLabel": [""],
          })
        });
        console.log("profile_attributes",this.profile_attributes);

      }
    }));
  }
  public fieldInput() {
    this.errorMsg = false;
  }

  changeRole(role:object){
    console.log(role);
  }

  deleteRole(role){
    let data={
      r_id:role.uuid,
      p_id:this.p_id
    }
    this.profileListService.deleteRole(data).then(((response: any) => {
      console.log("delete",response.status)
    }));
  }

  userRegistrion(){
    this.profileListService.userRegistration({
      p_id:this.p_id,
      password: this.profileListData.controls.profileList.value.password,
      username: this.profileListData.controls.profileList.value.username
    }).then(((response: any) => {
      if(response.status){
        this.router.navigate(['profile-list']);
      }
      
    }));
  }

  public editprofileList() {
    let profileListData = {
      p_id:this.p_id,
      name: this.profileListData.controls.profileList.value.loyaltyLabel,
      properties: {
        location: this.profileListData.controls.profileList.value.location,
        notification_token: this.profileListData.controls.profileList.value.notificationToken,
        name: this.profileListData.controls.profileList.value.name,
      },
      role: this.profileListData.controls.profileList.value.role
    };
    this.profileListService.editProfileList (profileListData).then(((response: any) => {   
      if(response.status){
        this.router.navigate(['profile-list']);
      }
     
    }));

  }

 
}
