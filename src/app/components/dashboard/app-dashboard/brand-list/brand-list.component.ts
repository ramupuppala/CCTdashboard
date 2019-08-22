import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../../../services/brand-list-service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {
  brandList:any;
  brandName:string="";
  searchKey:string='';
  constructor(private brandService:BrandService) { }

  getBrandList(){
    this.brandService.getBrandListData(this.brandName).then(((response: any) => {
      if (response.status) {
        this.brandList=response.data;
      }
    }));
  }

  ngOnInit() {
  this.getBrandList();
  }

  onChangeByInput(event){
    this.brandName=event.target.value;
  }

  clearBrandList(){
    this.brandName='';
    this.getBrandList();
  }

  deleteBrandList(br_id){
    this.brandService.deleteBrandList(br_id).then(((response: any) => {
      if (response.status) {
        this.getBrandList();
      }
    }));
  }
}
