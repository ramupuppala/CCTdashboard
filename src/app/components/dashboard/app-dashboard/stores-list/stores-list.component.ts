import { Component, OnInit } from '@angular/core';
import { StoreListService } from '../../../../services/store-list-service';
@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.css']
})
export class StoresListComponent implements OnInit {

  constructor( private storeService:StoreListService) { }
 store_type="APP_STORE";
 all_country_dropdown=[];
 all_states_dropdown=[];  
 all_city_dropdown=[];  
 ezones=[]; 
 stores=[];
 state= "";
 city= "";
 country="";
 location='';
 selected_ezone=null;
  ngOnInit() {
   this.getCoutry();
   this.getEngagementStores();
   this.getAppStore();
  }
  getCoutry(){
    this.storeService.getCountry().then((response:any)=>{
      if(response.status){
        this.all_country_dropdown=response.data;
      }
    })
  }

  getEngagementStores(){
    this.storeService.getEngagementStores().then((response:any)=>{
      if(response.status){
        this.ezones=response.data;
      }
    })
  }

  getAppStore(){
    this.storeService.getAppStore(
      {
        limit:0,
        skip:0,
        b_id:""
      }
    ).then((response:any)=>{
      if(response.status){
        this.stores=response.data;
      }
    })
  }

  onChangeCountry(){
    this.all_states_dropdown = [];
    this.all_city_dropdown = [];
    this.state = "";
    this.city = "";
    this.getState();
  }
  onChangeState(){
    this.all_city_dropdown = [];
    this.city = "";
    this.getCity();
  }  
  getState(){
    this.storeService.getState(this.country).then((response:any)=>{
      if(response.status){
        this.all_states_dropdown=response.data;

      }
    })
  }
  getCity(){
    this.storeService.getCity({country:this.country,state:this.state}).then((response:any)=>{
      if(response.status){
        this.all_city_dropdown=response.data;

      }
    })
  }

  searchForStore(){
    let url="";
    if(this.store_type=="APP_STORE"){
      url='';
      this.storeService.searchForStoreList({
        city:this.city
      },url).then((response:any)=>{
        if(response.status){
          this.stores=response.data;
        }
      })
    }else{
      this.storeService.searchEzone({
        e_id:this.selected_ezone.e_id,
        g_id:this.selected_ezone.g_id
      }).then((response:any)=>{
        if(response.status){
          this.stores=response.data;
          console.log(this.stores)
        }
      })
    }
  }

  public isLocation= (value) => value.split(",")[0]!='' && value.split(",")[0]!=undefined && value.split(",")[1]!='' && value.split(",")[1]!=undefined && !isNaN(parseInt(value.split(",")[0].trim())) && !isNaN(parseInt(value.split(",")[1].trim()))
  
}
