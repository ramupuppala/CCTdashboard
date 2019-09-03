import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { GeoZoneListService } from '../../../../../services/geozone-list-service';

@Component({
  selector: 'app-create-geozone-list',
  templateUrl: './create-geozone-list.component.html',
  styleUrls: ['./create-geozone-list.component.css']
})
export class CreateGeozoneListComponent implements OnInit {

  public geozoneListData: FormGroup;
  public submitted = false;
  public g_id="";
  public city_state_country_dropdown=[];
  public takeManualCityState:boolean=false;
  cityStateCountry:any= {
    city: '',
    state: '',
    country: '',
  }
  public isLocation= (value) => value.split(",")[0]!='' && value.split(",")[0]!=undefined && value.split(",")[1]!='' && value.split(",")[1]!=undefined && !isNaN(parseInt(value.split(",")[0].trim())) && !isNaN(parseInt(value.split(",")[1].trim()))
  public geozoneListDetails = {
    "geozoneList": {
      "name": "",
      "location": "",
      "img_url": ""
    }
  }
  getAllCountryStateCity(){
    this.geozoneService.getAllCountryStateCity().then((response:any)=>{
      if(response.status){
        this.city_state_country_dropdown=response.data;
      }
    })
  }
  ngOnInit() {
    // this.getGeozoneList();

    this.getAllCountryStateCity();
    this.g_id = this.route.snapshot.paramMap.get('g_id');
    if(this.g_id != undefined ){
      console.log("this.g_id !== undefined",this.g_id !=="")
      console.log("this.g_id !== undefined",this.g_id != undefined)
      console.log("this.g_id !== undefined",this.g_id !==null)   
  
      this.getGeozoneList();
    }
  
  }

  getGeozoneList(){
    this.geozoneService.getGeozoneListDataById(this.g_id).then((response:any)=>{
      if(response.status){
        this.cityStateCountry.city=response.data[0].city;
        this.cityStateCountry.state=response.data[0].state;
        this.cityStateCountry.country=response.data[0].country;
        this.geozoneListData = this.fb.group({
          "geozoneList": this.fb.group({
            "name": [response.data[0].name, Validators.required],
            "location": [response.data[0].location, Validators.required],
            "img_url": [response.data[0].img_url],
            "mute_duration": [response.data[0].mute_duration,Validators.required],
            "call_to_action_text": [response.data[0].call_to_action_text],
            "expiry_timestamp": [new Date(new Date().setFullYear(new Date().getFullYear()+1)),Validators.required],
            "is_active": [response.data[0].is_active,Validators.required],
            "radius": [response.data[0].radius,Validators.required],
            "loitering_delay": [response.data[0].loitering_delay,Validators.required],
            "city_state_country_dropdown":[{}]
          })
        });
      }
    })
  }

  public errorMsg: boolean = false;
  
  constructor(private router: Router,private route: ActivatedRoute, private geozoneService: GeoZoneListService, private fb: FormBuilder) {
    this.geozoneListData = fb.group({
      "geozoneList": fb.group({
        "name": [null, Validators.required],
        "location": [null, Validators.required],
        "img_url": [""],
        "mute_duration": [0,Validators.required],
        "call_to_action_text": [""],
        "expiry_timestamp": [new Date(new Date().setFullYear(new Date().getFullYear()+1)),Validators.required],
        "is_active": [true,Validators.required],
        "radius": [500,Validators.required],
        "loitering_delay": [30000,Validators.required],
        "city_state_country_dropdown":[{}]
      })
    });
  }
  public fieldInput() {
    this.errorMsg = false;
}
getLocation(){

  this.geozoneService.findLocation(this.geozoneListData.controls.geozoneList.value.location).then((response:any)=>{
  
    console.log("location response: ", response);
    var results = response.results;
    if(results.length){
      if(!this.takeManualCityState){
        this.cityStateCountry.city = "";
        this.cityStateCountry.state = "";
        this.cityStateCountry.country = "";
      }
      for (var ac = 0; ac < results[0].address_components.length; ac++) {
        var component = results[0].address_components[ac];

        switch(component.types[0]) {
          case 'locality':
                if(component.long_name.trim().length){
                  this.cityStateCountry.city = component.long_name;
                }
                break;
          case 'administrative_area_level_1':
              if(component.long_name.trim().length){
                this.cityStateCountry.state = component.long_name;
              }
              break;
          case 'country':
              if(component.long_name.trim().length){
                this.cityStateCountry.country = component.long_name;
              }
              // storableLocation.registered_country_iso_code = component.short_name;
            break;
        }
      }
    }

    console.log('this.reverse_location', this.cityStateCountry.city, this.cityStateCountry.state, this.cityStateCountry.country);
    if((this.cityStateCountry.city == "" || this.cityStateCountry.state == "" || this.cityStateCountry.country == "") && !this.takeManualCityState){
      console.log('could not fild city or state from location...');
      this.takeManualCityState = true;
    }else{
      if(this.cityStateCountry.city && this.cityStateCountry.state && this.cityStateCountry.country){
        this.takeManualCityState = false;

        this.storeGeoZone();
      }else{
        console.log('please fill manual city and state...');
      }
    }
  })
}
  public creategeozoneList(){
    console.log(this.isLocation(this.geozoneListData.controls.geozoneList.value.location))

    if(this.geozoneListData.valid){
      if(!this.isLocation(this.geozoneListData.controls.geozoneList.value.location)){
        alert("lat lan invalid")
      }
      else
      this.getLocation();      
    }
    console.log(this.geozoneListData.controls.geozoneList.value)
  }
  setCityStateCountry(){
    console.log('setCityStateCountry', this.geozoneListData.controls.geozoneList.value.city_state_country_dropdown);
    this.cityStateCountry = this.geozoneListData.controls.geozoneList.value.city_state_country_dropdown;
  }
  storeGeoZone(){
    
      let payload:any={
        properties: {
          name: this.geozoneListData.controls.geozoneList.value.name,
          city: this.cityStateCountry.city,
          state: this.cityStateCountry.state,
          country: this.cityStateCountry.country,
          img_url : this.geozoneListData.controls.geozoneList.value.img_url,
          location: this.geozoneListData.controls.geozoneList.value.location,
          is_active: this.geozoneListData.controls.geozoneList.value.is_active,
          call_to_action_text: this.geozoneListData.controls.geozoneList.value.call_to_action_text,
          radius: parseFloat(this.geozoneListData.controls.geozoneList.value.radius),
          loitering_delay: parseFloat(this.geozoneListData.controls.geozoneList.value.loitering_delay),
          expiry_timestamp: new Date(this.geozoneListData.controls.geozoneList.value.expiry_timestamp).getTime(),
          mute_duration : Number(this.geozoneListData.controls.geozoneList.value.mute_duration)
        }
        
      }
      if(this.g_id != undefined ){
        payload.g_id=this.g_id;
        this.geozoneService.updateGeozoneList(payload).then(((response:any)=>{
          if(response.status){
            this.router.navigate(['geozone-list']); 
          }
        }))
      }
      else{
        this.geozoneService.createGeozoneList(payload).then(((response:any)=>{
          if(response.status){
            this.router.navigate(['geozone-list']); 
          }
        }))
      }
     
    }
  
}
