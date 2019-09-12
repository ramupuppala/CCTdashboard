import { Component, OnInit } from '@angular/core';
import { StoreListService } from '../../../../../../services/store-list-service';
import { ActivatedRoute,Router} from '@angular/router';
@Component({
  selector: 'app-assign-brand',
  templateUrl: './assign-brand.component.html',
  styleUrls: ['./assign-brand.component.css']
})
export class AssignBrandComponent implements OnInit {

  constructor(private storeService:StoreListService,private route:ActivatedRoute,private router:Router) { }
  brands:[];
  st_id="";
  ngOnInit() {
    this.st_id=this.route.snapshot.paramMap.get('st_id');
    this.getBrands();
  }

  getBrands(){
    this.storeService.getBrands().then((response:any)=>{
      if(response.status){
        this.brands=response.data;
      }
    })
  }

  assignBrands(br_id){
    this.storeService.assignBrands({br_id,st_id:this.st_id}).then((response:any)=>{
      if(response.status){
        // this.router.navigate(['geozone-list']); 
        alert("successfully assigned")
      }
    })
  }
}
