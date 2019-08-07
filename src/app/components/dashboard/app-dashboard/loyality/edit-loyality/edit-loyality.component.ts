import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { LoyalityService } from '../../../../../services/loyality-service';

@Component({
  selector: 'app-edit-loyality',
  templateUrl: './edit-loyality.component.html',
  styleUrls: ['./edit-loyality.component.css']
})
export class EditLoyalityComponent implements OnInit {

  public loyalityListData: FormGroup;
  public submitted = false;
  public label:string;
  public oldLabel:string="";
  public validation:string="";
  public loyalityListDetails = {
    "loyalityList": {
      "label": "",
      "rank": "",
      "description": ""
    }
  }

  public errorMsg: boolean = false;
  constructor(private router: Router,private route: ActivatedRoute, private loyalityService: LoyalityService, private fb: FormBuilder) {
    this.loyalityListData = fb.group({
      "loyalityList": fb.group({
        "newLabel": [null, Validators.required],
        "rank": [null, Validators.required],
        "description": [null,Validators.required],
      })
    });
  }

  ngOnInit(){
    this.label = this.route.snapshot.paramMap.get('name');
    this.loyalityService.getLabel(this.label).then(((data: any) => {    
      if (data.status) {
        this.oldLabel=data.message.records[0]._fields[1];
        this.loyalityListData = this.fb.group({
          "loyalityList": this.fb.group({
            "newLabel": [data.message.records[0]._fields[1], Validators.required],
            "rank": [data.message.records[0]._fields[0], Validators.required],
            "description": [data.message.records[0]._fields[2], Validators.required],
          })
        });
      }
    }));;
  }

  public fieldInput() {
    this.errorMsg = false;
}
  public editLoyalityList(){
    this.loyalityListData.controls.loyalityList.value.oldLabel=this.oldLabel;
    if(this.loyalityListData.valid){
      this.loyalityService.editLoyalityList(this.loyalityListData.controls.loyalityList.value).then(((data: any) => {    
        if (data.status) {
          this.router.navigate(['loyality']);
        }
        else{
         this.validation=data.validation;
        }
      }));;
    }
    console.log(this.loyalityListData.controls.loyalityList.value)
  }

}