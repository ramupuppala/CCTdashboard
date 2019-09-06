import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import { StoreListService } from '../../../../../services/store-list-service';
@Component({
  selector: 'app-store-brand',
  templateUrl: './store-brand.component.html',
  styleUrls: ['../stores-list.component.css']
})
export class StoreBrandComponent implements OnInit {

  st_id="";
  e_id="";
  storeNameAttribute= [];
  storeDetails:any;
  brands= [];
  constructor( private storeService:StoreListService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.st_id=this.route.snapshot.paramMap.get('st_id');
    this.e_id=this.route.snapshot.paramMap.get('e_id');
    this.getStore();
    this.getBrands();
  }

  getStore(){
    this.storeService.getStore({
      st_id:this.st_id,
      e_id:this.e_id
    },'/v1/store/get/').then((response:any)=>{
      if(response.status){
        this.storeDetails=response.data[0];
        this.storeNameAttribute=this.storeDetails.store_attributes.filter((item)=>{
          return item.key == 'name'
        })
      }
    })
  }

  getBrands(){
    this.storeService.getStore({
      st_id:this.st_id
    },"/v1/store/get/brand/").then((response:any)=>{
      if(response.status){
        this.brands=response.data;
      }
    })
  }
}
