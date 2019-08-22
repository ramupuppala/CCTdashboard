import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BrandService } from '../../../../../services/brand-list-service';
@Component({
  selector: 'app-create-brand-list',
  templateUrl: './create-brand-list.component.html',
  styleUrls: ['./create-brand-list.component.css']
})
export class CreateBrandListComponent  {
  public brandListData: FormGroup;
  public submitted = false;
  public brandListDetails = {
    "brandList": {
      "name": "",
      "custom_brand_id": "",
      "weight": ""
    }
  }
  public errorMsg: boolean = false;
  constructor(private router: Router, private brandService: BrandService, private fb: FormBuilder) {
    this.brandListData = fb.group({
      "brandList": fb.group({
        "name": [null, Validators.required],
        "custom_brand_id": [null, Validators.required],
        "weight": [1,Validators.required],
      })
    });
  }
  public fieldInput() {
    this.errorMsg = false;
}
  public createbrandList(){
    
    if(this.brandListData.valid){
      this.brandService.createBrandList(this.brandListData.controls.brandList.value).then(((data: any) => {    
        if (data.status) {
          this.router.navigate(['brand-list/']);
        }
      }));;
    }
    console.log(this.brandListData.controls.brandList.value)
  }

}
