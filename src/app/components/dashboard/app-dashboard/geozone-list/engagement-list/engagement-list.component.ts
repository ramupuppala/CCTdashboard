import { Component, OnInit } from '@angular/core';
import { GeoZoneListService } from '../../../../../services/geozone-list-service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-engagement-list',
  templateUrl: './engagement-list.component.html',
  styleUrls: ['./engagement-list.component.css']
})
export class EngagementListComponent implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute, private geozoneService: GeoZoneListService) { }
  g_id:any='';
  geoZoneDetails:any={};
  expiry_timestamp:any;
  engagementZones=[];
  geoNotification= [];
  ngOnInit() {
    this.g_id = this.route.snapshot.paramMap.get('g_id');
    console.log(this.g_id)
    this.getGeozoneListDataById();
    this.getEngagementList();
    this.getGeogoneNotification();
  }

  getGeozoneListDataById(){
    this.geozoneService.getGeozoneListDataById(this.g_id).then((response:any)=>{
      if(response.status){
        this.geoZoneDetails=response.data[0];
        this.expiry_timestamp=new Date(response.data[0].expiry_timestamp).getTime();
      }
    })
  }
  getEngagementList(){
    this.geozoneService.getEngagementList(this.g_id).then((response:any)=>{
      if(response.status){
        this.engagementZones=response.data;
        console.log("this.eng",this.engagementZones)
        
      }
    })
  }
  getGeogoneNotification(){
    this.geozoneService.getGeozoneNotification(this.g_id).then((response:any)=>{
      if(response.status){
        this.geoNotification=response.data;
      }
    })
  }

  deleteEngagementZone(e_id){
    this.geozoneService.deleteEngagementzoneById({
      g_id:this.g_id,
      e_id:e_id
    }).then((response:any)=>{
      if(response.status){
        this.getEngagementList();
      }
    })
  }

  deleteNotification(nt_id){
    this.geozoneService.removeGeoNodification({
      g_id:this.g_id,
      nt_id
    }).then((response:any)=>{
      if(response.status){
        this.getGeogoneNotification();
      }
    })
  }
}
