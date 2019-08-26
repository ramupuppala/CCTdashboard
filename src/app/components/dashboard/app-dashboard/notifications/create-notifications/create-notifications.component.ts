import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../../../../services/notification-service';
@Component({
  selector: 'app-create-notifications',
  templateUrl: './create-notifications.component.html',
  styleUrls:['../notifications.component.css']
})
export class CreateNotificationsComponent implements OnInit {
  search_for:string='GEOZONE';
  search_with:string='GEOZONE';
  country:string="";
  state:string="";
  city:string="";
  all_country_dropdown=[];
  all_states_dropdown=[];
  all_city_dropdown=[];
  ezone_dropdown=[];
  constructor( private notificationService:NotificationsService) { }
  active_days:any= [
    {name:"SUNDAY",value: "0800-1700"},
    {name:"MONDAY",value: "0800-1700"},
    {name:"TUESDAY",value: "0800-1700"},
    {name:"WEDNESDAY",value: "0800-1700"},
    {name:"THURSDAY",value: "0800-1700"},
    {name:"FRIDAY",value: "0800-1700"},
    {name:"SATURDAY",value: "0800-1700"}
  ];

  getCountry(){
    this.notificationService.getCountry().then(((response:any)=>{
      if(response.status){
        this.all_country_dropdown = response.data ? response.data.map(item => item.country) : [];
        console.log(this.all_country_dropdown);
      }
    }))
  }
  // getState(){
  //   this.notificationService..then(((response:any)=>{
  //     if(response.status){
  //       this.all_country_dropdown = response.data ? response.data.map(item => item.country) : [];
  //       console.log(this.all_country_dropdown);
  //     }
  //   }))
  // }

  ngOnInit() {
    this.getCountry();
  }

  onChange(event){
    this.search_for=event.target.value;
  }
  onSearchWith(event){
    this.search_with=event.target.value;
  }

  showBrandDropdown() {
    return this.search_for == 'STORE';
  }
  showStoreDropdown () {
    return this.search_for == 'STORE' && ['STORE'].some(item => item == this.search_with);
  }
  showEzoneDropdown () {
    return this.search_for == 'STORE' && ['EZONE', 'STORE'].some(item => item == this.search_with);
  }
  showGeozoneDropdown () {
    return ['GEOZONE', 'EZONE', 'STORE'].some(item => item == this.search_with);
  }
  showCityDropdown () {
    return ['CITY', 'GEOZONE', 'EZONE', 'STORE'].some(item => item == this.search_with);
  }
  showStateDropdown () {
    return ['STATE', 'CITY', 'GEOZONE', 'EZONE', 'STORE'].some(item => item == this.search_with);
  }

  getState(event){
    this.country=event.target.value;
    this.notificationService.getState(this.country).then((response:any)=>{
      if(response.status){
        this.all_states_dropdown = response.data ? response.data.map(item => item.state) : [];

      }
    })
  }

  getCities(event){
    this.state=event.target.value;
    this.notificationService.getCities({
      country:this.country,
      state:this.state
    }).then((response:any)=>{
      if(response){
        this.all_city_dropdown = response.data ? response.data.map(item => item.city) : [];
      }
    })
  }
  getZone(event){
    this.city=event.target.value;
    this.notificationService.getZone(this.city).then((response:any)=>{
      if(response){
        this.ezone_dropdown=response.data;
      }
    })
  }

}
