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
  ezoneDetails:any={};
  expiry_timestamp:any;
  ngOnInit() {
    this.g_id = this.route.snapshot.paramMap.get('g_id');
    this.e_id = this.route.snapshot.paramMap.get('e_id');
    this.getEzoneList();
  }

  getEzoneList(){
    this.geozoneService.getEngagementzoneById({
      g_id:this.g_id,
      e_id:this.e_id
    }).then((response:any)=>{
      if(response.status){
        this.ezoneDetails=response.data[0];
        console.log("this ezone",this.ezoneDetails);
      }
    })
  }
}
