import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GeoZoneListService } from '../../../../../services/geozone-list-service';

@Component({
  selector: 'app-geo-stores',
  templateUrl: './geo-stores.component.html',
  styleUrls: ['./geo-stores.component.css']
})
export class GeoStoresComponent implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute, private geozoneService: GeoZoneListService) { }
  public g_id:any;
  public e_id:any;
  ezoneDetails={};
  stores=[];
  expiry_timestamp:any;
  location='';
  ngOnInit() {
    this.g_id = this.route.snapshot.paramMap.get('g_id');
    this.e_id = this.route.snapshot.paramMap.get('e_id');
    this.getEzoneList();
    this.getGeoStore();
  }

  getEzoneList(){    
    this.geozoneService.getEngagementzoneById({
      g_id:this.g_id,
      e_id:this.e_id
    }).then((response:any)=>{
      if(response.status){
        this.ezoneDetails=response.data[0];
        this.expiry_timestamp=new Date(response.data[0].expiry_timestamp);
      }
    })
  }

  getGeoStore(){
    this.geozoneService.getGeoStore({
      g_id:this.g_id,
      e_id:this.e_id
    }).then((response:any)=>{
      if(response.status){
        this.stores=response.data;
        console.log(this.stores)
        
      }
    })
  }  
  public isLocation= (value) => value.split(",")[0]!='' && value.split(",")[0]!=undefined && value.split(",")[1]!='' && value.split(",")[1]!=undefined && !isNaN(parseInt(value.split(",")[0].trim())) && !isNaN(parseInt(value.split(",")[1].trim()))
  
  updateLocation(index){
    if(this.isLocation(this.location)){
      
      this.geozoneService.updateLoaction({
        st_id:this.stores[index].store.uuid,
        g_id:this.stores[index].g_id,
        e_id:this.stores[index].e_id,
        "properties":{
          location:this.location
        }
      }).then((response:any)=>{
        if(response.status){

        }
        else{
          alert(response.validation)
          this.location="";
        }
      })
    }
    console.log("index , locaiton",index,this.location)
  }

  deleteGeoStore(index){
    this.geozoneService.deleteGeoStore({
     g_id:this.g_id,
     e_id:this.e_id,
     st_id:this.stores[index].st_id
    }).then((response:any)=>{
      if(response.status){
        this.getGeoStore();
      }
    })
  }
}
