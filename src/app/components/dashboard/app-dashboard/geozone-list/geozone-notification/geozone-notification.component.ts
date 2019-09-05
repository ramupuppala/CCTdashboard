import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { NotificationsService } from '../../../../../services/notification-service';
import { GeoZoneListService } from '../../../../../services/geozone-list-service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-geozone-notification',
  templateUrl: './geozone-notification.component.html',
  styleUrls: ['./geozone-notification.component.css']
})
export class GeozoneNotificationComponent implements OnInit {

  textPlaceholder = 'Welcome {{user_name}} to {{geozone_name}}';
  subTextPlaceholder = '{{consumer_preferred_brands}} here';
  available_wildcards:any;
  available_wildcards_sub_text:any;
  search_for: string = 'GEOZONE';
  search_with: string = 'GEOZONE';
  brand: any = {};
  search_result = [];
  active_days = {};
  notification_types = [];
  notification_action_types = [];
  selected_notification_type = {};
  selected_notification_action_type = {};
  labels = [];
  selected_match_type_brands = [];
  brand_selected_for_current_search: any = {};
  g_id:any;
  nt_id:any;
  public notificationListData: FormGroup;
  public notificationListDetails = {
    "notificationList": {
      "text": "",
      "subtext": "",
      "action_url": "",
      "image_url": "",
      "isActive": true,
      "notification_match_type": "",
      "selected_notification_type": {}
    }
  }
  constructor(private notificationService: NotificationsService, private fb: FormBuilder,private router: Router,private route: ActivatedRoute,private geozoneService:GeoZoneListService) {
    this.available_wildcards=["{{user_name}}", "{{store_name}}", "{{geozone_name}}", "{{ezone_name}}"];
    this.available_wildcards_sub_text= ["{{consumer_preferred_brands}}"]  
    this.notificationListData = fb.group({
      "notificationList": fb.group({
        "text": [null, Validators.required],
        "subtext": [null],
        "action_url": [null],
        "image_url": [null],
        "isActive": [true],
        "notification_match_type": [null, Validators.required],
        "validity_end": [new Date(new Date().setFullYear(new Date().getFullYear() + 1))],
        "validity_start": [new Date()],
        "selected_notification_type": [{}, Validators.required],
        "active_days": fb.group({
          "SUNDAY":["0800-1700"],
          "MONDAY": ["0800-1700"],
          "TUESDAY": ["0800-1700"],
          "WEDNESDAY": ["0800-1700"],
          "THURSDAY": ["0800-1700"],
          "FRIDAY": ["0800-1700"],
          "SATURDAY": ["0800-1700"],
        }),
        "action_type": [{}, Validators.required],
        "inventory_request_params": [null]
      })
    });
  }


  ngOnInit() {
    this.g_id = this.route.snapshot.paramMap.get('g_id');
    this.nt_id = this.route.snapshot.paramMap.get('nt_id');
    if(this.nt_id != undefined){
    this. getNotificationById();
    }
    
    this.getNotificationType();
    this.getNotificationActionType();
  }

  getNotificationById(){
    this.geozoneService.getGeoNotificationListById({
      g_id:this.g_id,
      nt_id:this.nt_id,
      search_for:this.search_for
    }).then((response:any)=>{
        if(response.status){
          const active_days=JSON.parse(response.data[0].notification[0].active_days)
          let {text,sub_text,image_url,isActive,notification_match_type,validity_end,validity_start,action_url} =response.data[0].notification[0];
          this.notificationListData = this.fb.group({
            "notificationList": this.fb.group({
              "text": [text, Validators.required],
              "subtext": [sub_text],
              "action_url": [action_url],
              "image_url": [image_url],
              "isActive": [isActive],
              "notification_match_type": [notification_match_type, Validators.required],
              "validity_end": [new Date(validity_end)],
              "validity_start": [new Date(validity_start)],
              "selected_notification_type": [response.data[0].notification_type[0], Validators.required],
              "active_days": this.fb.group({
                "SUNDAY":[active_days.SUNDAY],
                "MONDAY": [active_days.MONDAY],
                "TUESDAY": [active_days.TUESDAY],
                "WEDNESDAY": [active_days.WEDNESDAY],
                "THURSDAY": [active_days.THURSDAY],
                "FRIDAY": [active_days.FRIDAY],
                "SATURDAY": [active_days.SATURDAY],
              }),
              "action_type": [response.data[0].notification_action_type[0], Validators.required],
              "inventory_request_params": [null]
            })
          });
        }
      })
  }

  getNotificationType() {
   
    this.notificationService.getSelectedNotifiationType().then((response: any) => {
      if (response.status) {
        this.notification_types = response.data[0].notification_types;
      }
    })
  }

  getNotificationActionType() {
    this.notificationService.getActionNotifiationType().then((response: any) => {
      if (response.status) {
        this.notification_action_types =
          response.data[0].notification_action_types;
        console.log("notifcationsd", this.notification_action_types)
        this.notification_action_types.forEach(element => {
          if (element.name == 'Entry') {
            this.selected_notification_action_type = element;
          }
        })
      }
    })
  }

  

  saveNotificationList() {
    var store_or_gzone_list = [];
    this.search_result.forEach((item) => {
      store_or_gzone_list.push(item.uuid);
    });
    var url = "";
    // var time= new Date(this.notificationListData.controls.notificationList.value.validity_start).getTime();
    // console.log(time)
    var payload: any = {};
    payload.notification = {
      action_url: this.notificationListData.controls.notificationList.value.action_url,
      image_url: this.notificationListData.controls.notificationList.value.image_url,
      isActive: this.notificationListData.controls.notificationList.value.isActive,
      notification_match_type: this.notificationListData.controls.notificationList.value.notification_match_type,
      sub_text: this.notificationListData.controls.notificationList.value.subtext,
      text: this.notificationListData.controls.notificationList.value.text,
      validity_start: new Date(this.notificationListData.controls.notificationList.value.validity_start).getTime(),
      validity_end: new Date(this.notificationListData.controls.notificationList.value.validity_end).getTime(),
    };
    payload.action_type = this.notificationListData.controls.notificationList.value.action_type;
    payload.notification_type = this.notificationListData.controls.notificationList.value.selected_notification_type;
    payload.active_days = this.notificationListData.controls.notificationList.value.active_days;
    payload.inventory_request_params = this.notificationListData.controls.notificationList.value.inventory_request_params;


    
    console.log("notification",payload)
    if(this.nt_id != undefined){
      payload.nt_id=this.nt_id; 
      if (this.search_for == "GEOZONE") {
        payload.selected_match_type_brands = [];
        url = "/v1/geozone/notification/update/";
        payload.g_id = [this.g_id];
      } else if (this.search_for == "STORE") {
        // payload.selected_match_type_brands = this.selected_match_type_brands.map(brand => brand.br_id);
        payload.selected_match_type_brands = [];
        url = "/v1/store/notification/update/";
        payload.st_id = [this.g_id];
            
      }
    }
    else{
      if (this.search_for == "GEOZONE") {
        payload.selected_match_type_brands = [];
        url = "/v1/geozone/notification/create/";
        payload.g_id = [this.g_id];
      } else if (this.search_for == "STORE") {
        payload.selected_match_type_brands = this.selected_match_type_brands.map(
          brand => brand.br_id
        );
        url = "/v1/store/notification/create/";
        payload.st_id = [this.g_id];
      }     
    }
    console.log(payload)
    this.geozoneService.createGeoNotification(payload,url).then((response:any)=>{
      if(response.status){
        alert("successfully Created ");
        this.router.navigate(['engagement-zone-list',this.g_id]); 
      }
    })
  }
}

