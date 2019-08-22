import { Component, OnInit } from '@angular/core';
import { BroadcastNotificationService } from './../../../../services/broadcast-notification-service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-broadcast-notification',
  templateUrl: './broadcast-notification.component.html',
  styleUrls: ['./broadcast-notification.component.css']
})
export class BroadcastNotificationComponent implements OnInit {  
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  selectedGeoZone:string="";

  eZoneDropdownList=[];
  eZoneSelectedItems=[];
  eZonesDropdownSettings = {};
  
  public errorMsg: boolean = false;
  public showNotificationForm:boolean = false;
  public geoZoneData: FormGroup;
  constructor(private broadcastNotification : BroadcastNotificationService,private fb: FormBuilder) {
    this.geoZoneData = fb.group({
      "geoZone": fb.group({
        "broadcast_type": [null, Validators.required],
        "text": ['', Validators.required],
        "sub_text": [null,Validators.required],
        "action_url": [null,Validators.required],
        "image_url": [null,Validators.required],
        "notification_match_type": ['BROADCAST',Validators.required],
        "isActive":true,
      })
    });
   }
  ngOnInit() {   
    this.broadcastNotification.getGeoZone().then(((data: any) => {
      if (data.status) {
        this.dropdownList = data.data;
        
      }
    }));
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'g_id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.eZonesDropdownSettings = {
      singleSelection: false,
      idField: 'g_id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  public fieldInput() {
    this.errorMsg = false;
    console.log("dsfdsfdfsd",this.geoZoneData.controls.geoZone.value.broadcast_type);
   
}
  onItemSelect(item: any) {
    console.log(this.selectedItems)
    if(this.geoZoneData.controls.geoZone.value.broadcast_type == "EZONE")
    {
      this.getEzoneDataList(item);
    }
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onEzoneItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems)
    
  }
  onEzoneSelectAll(items: any) {
    console.log(items);
  }
  showNotification(){
  this.showNotificationForm=true;
  }
  createNotification(){
    let g_ids_or_e_ids=[];
    if(this.geoZoneData.controls.geoZone.value.broadcast_type == "GZONE"){
      g_ids_or_e_ids=this.selectedItems.map(item=>item.g_id);
    }
    else{
      g_ids_or_e_ids=this.eZoneSelectedItems.map(item=>item.g_id);
    }
    const data={
      "broadcast_type":this.geoZoneData.controls.geoZone.value.broadcast_type,
      "g_ids_or_e_ids":g_ids_or_e_ids,
      "notification":{
        "sub_text":this.geoZoneData.controls.geoZone.value.sub_text,
        "text":this.geoZoneData.controls.geoZone.value.text,
        "title":this.geoZoneData.controls.geoZone.value.text,
        "notification_match_type":this.geoZoneData.controls.geoZone.value.notification_match_type,
        "isActive":this.geoZoneData.controls.geoZone.value.isActive,
        "action_url":this.geoZoneData.controls.geoZone.value.action_url,
      }    

    }
    this.broadcastNotification.createZoneNofifications(data).then(((data: any) => {
      if (data.status) {
        this.eZoneDropdownList = data.data; 
        console.log(this.eZoneDropdownList);       
      }
      else{
        alert(data.validation);
        location.reload();
      }
    }));
  }
  getEzoneDataList(item:any){
    this.broadcastNotification.getEzone(item.name).then(((data: any) => {
      if (data.status) {
        this.eZoneDropdownList = data.data; 
        console.log(this.eZoneDropdownList);       
      }
    }));
  }
  zoneLabel(){
    this.selectedItems = [];
    this.eZoneSelectedItems = [];
    this.showNotificationForm=false;
      this.dropdownSettings = {
        singleSelection:this.geoZoneData.controls.geoZone.value.broadcast_type == "EZONE"? true:false,
        idField: 'g_id',
        textField: 'name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
    
    this.geoZoneData = this.fb.group({
      "geoZone": this.fb.group({
        "broadcast_type": [this.geoZoneData.controls.geoZone.value.broadcast_type, Validators.required],
        "text": ["", Validators.required],
        "sub_text": ["",Validators.required],
        "action_url": ["",Validators.required],
        "image_url": ["",Validators.required],
        "notification_match_type": ['BROADCAST',Validators.required],
        "isActive":true,
      })
    });
  }
}