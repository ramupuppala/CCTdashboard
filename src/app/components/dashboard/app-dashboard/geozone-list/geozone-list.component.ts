import { Component, OnInit } from '@angular/core';
import { GeoZoneListService } from '../../../../services/geozone-list-service'
@Component({
  selector: 'app-geozone-list',
  templateUrl: './geozone-list.component.html',
  styleUrls: ['./geozone-list.component.css']
})
export class GeozoneListComponent implements OnInit {

  constructor( private geoZoneListService:GeoZoneListService) { }
  searchByName:string="";
  geozones=[];
  getGeozoneList(){
    this.geoZoneListService.getGeoZoneListData({
      limit:10,
      skip:0,
      zonename:this.searchByName
    }).then((response:any)=>{
      if(response.status){
        this.geozones=response.data;
        console.log(this.geozones);
      }
    })
  }
  ngOnInit() {
    this.getGeozoneList();
  }

  onChange(event){
    this.searchByName=event.target.value;
    
  }

  cleareSearch(){
    this.searchByName="";
    this.getGeozoneList();
  }
  
}
