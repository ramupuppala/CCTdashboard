import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { LoyalityService } from '../../../../../services/loyality-service';


@Component({
  selector: 'app-create-loyality',
  templateUrl: './create-loyality.component.html',
  styleUrls: ['./create-loyality.component.css']
})
export class CreateLoyalityComponent {

  public loyalityListData: FormGroup;
  public submitted = false;
  public loyalityListDetails = {
    "loyalityList": {
      "label": "",
      "rank": "",
      "description": ""
    }
  }
  public errorMsg: boolean = false;
  constructor(private router: Router, private loyalityService: LoyalityService, private fb: FormBuilder) {
    this.loyalityListData = fb.group({
      "loyalityList": fb.group({
        "label": [null, Validators.required],
        "rank": [null, Validators.required],
        "description": [null,Validators.required],
      })
    });
  }
  public fieldInput() {
    this.errorMsg = false;
}
  public createLoyalityList(){
    if(this.loyalityListData.valid){
      this.loyalityService.createLoyalityList(this.loyalityListData.controls.loyalityList.value).then(((data: any) => {    
        if (data.status) {
          console.log(data);
        }
      }));;
    }
    console.log(this.loyalityListData.controls.loyalityList.value)
  }

}
