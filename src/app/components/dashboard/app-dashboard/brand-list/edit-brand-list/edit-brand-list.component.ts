import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BrandService } from '../../../../../services/brand-list-service';

@Component({
  selector: 'app-edit-brand-list',
  templateUrl: './edit-brand-list.component.html',
  styleUrls: ['./edit-brand-list.component.css']
})
export class EditBrandListComponent implements OnInit {
  public brandListData: FormGroup;
  public submitted = false;
  public br_id:string="";
  public brandListDetails = {
    "brandList": {
      "name": "",
      "custom_brand_id": "",
      "weight": ""
    }
  }
  public errorMsg: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute, private brandService: BrandService, private fb: FormBuilder) {
    this.brandListData = fb.group({
      "brandList": fb.group({
        "name": [null, Validators.required],
        "custom_brand_id": [null, Validators.required],
        "weight": [1,Validators.required],
      })
    });
  }
  ngOnInit() {
    this.br_id = this.route.snapshot.paramMap.get('br_id');
    this.brandService.getBrandListById(this.br_id).then(((data: any) => {    
      if (data.status) {
        this.brandListData = this.fb.group({
          "brandList": this.fb.group({
            "name": [data.data[0].name, Validators.required],
            "custom_brand_id": [data.data[0].custom_brand_id, Validators.required],
            "weight": [data.data[0].weight,Validators.required],
          })
        });
      }
    }));;
    }
  public fieldInput() {
    this.errorMsg = false;
}
  public updateBrandList(){

    if(this.brandListData.valid){
      this.brandService.updateBrandList({
        br_id:this.br_id,
        "properties":this.brandListData.controls.brandList.value     
      }).then(((data: any) => {    
        if (data.status) {
          this.router.navigate(['brand-list/']);
        }
      }));
    }
    console.log(this.brandListData.controls.brandList.value)
  }

}
