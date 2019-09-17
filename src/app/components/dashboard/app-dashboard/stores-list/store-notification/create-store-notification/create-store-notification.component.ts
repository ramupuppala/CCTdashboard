import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from '../../../../../../services/notification-service';
@Component({
  selector: 'app-create-store-notification',
  templateUrl: './create-store-notification.component.html',
  styleUrls: ['./create-store-notification.component.css']
})
export class CreateStoreNotificationComponent implements OnInit {
  textPlaceholder = 'Welcome {{user_name}} to {{ezone_name}}';
  subTextPlaceholder = '{{consumer_preferred_brands}} here';
  available_wildcards:any;
  available_wildcards_sub_text:any;
  search_for: string = 'STORE';
  search_with: string = 'STORE';
  isCreateNotificaton: boolean = false;
  response_title: string = "";
  country: string = "";
  state: string = "";
  city: string = "";
  zone: string = "";
  ezone: string = "";
  brand: any = {};
  search_result = [];
  all_country_dropdown = [];
  all_states_dropdown = [];
  all_city_dropdown = [];
  geozone_dropdown = [];
  brand_dropdown: [];
  store_dropdown: [];
  selected_geozone = null;
  ezone_dropdown = [];
  active_days = {};
  notification_types = [];
  notification_action_types = [];
  selected_notification_type = {};
  selected_notification_action_type = {};
  labels = [];
  selected_match_type_brands:any = [];
  brand_selected_for_current_search: any = {};
  st_id='';
  store_brand_list= [];
  public notificationListData: FormGroup;
  public notificationListDetails = {
    "notificationList": {
      "text": "",
      "subtext": "",
      "action_url": "",
      "image_url": "",
      "isActive": true,
      "notification_match_type": "",
      "selected_notification_type": {},
      "store_brand_list":{},
      "selected_match_type_brands":""
    }
  }
  constructor(private notificationService: NotificationsService,private route: ActivatedRoute, private fb: FormBuilder,private router: Router) {
    this.available_wildcards=["{{user_name}}", "{{store_name}}", "{{geozone_name}}", "{{ezone_name}}"];
    this.available_wildcards_sub_text= ["{{consumer_preferred_brands}}"]
    console.log(this.available_wildcards)
    this.active_days = {
      SUNDAY: "0800-1700",
      MONDAY: "0800-1700",
      TUESDAY: "0800-1700",
      WEDNESDAY: "0800-1700",
      THURSDAY: "0800-1700",
      FRIDAY: "0800-1700",
      SATURDAY: "0800-1700"
    };
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
        "selected_match_type_brands": [{}],
        "label": [null],
        "inventory_request_params": [null]
      })
    });
  }


  getCountry() {
    this.notificationService.getCountry().then(((response: any) => {
      if (response.status) {
        this.all_country_dropdown = response.data ? response.data.map(item => item.country) : [];
        console.log(this.all_country_dropdown);
      }
    }))
  }
  getBrand() {
    this.notificationService.getBrands().then((response: any) => {
      if (response.status) {
        this.brand_dropdown = response.data ? response.data : [];
      }
    })
  }
  // getState(){
  //   this.notificationService..then(((response:any)=>{
  //     if(response.status){
  //       this.all_country_dropdown = response.data ? response.data.map(item => item.country) : [];
  //       console.log(this.all_country_dropdown);
  //     }
  //   }))
  // }

  getUniqueBrands(){
    this.notificationService.getUniqueBrands({
      "st_ids": [this.st_id]
    }).then((response:any)=>{
      if(response.status){
        this.store_brand_list = response.data[0].associated_brands;
      }
    })
  }

  ngOnInit() {
    this.st_id = this.route.snapshot.paramMap.get('st_id');
    this.getCountry();
    this.getBrand();
    this.getNotificationType();
    this.getProfileLabel();
    this.getNotificationActionType();
    this.getUniqueBrands()
  }

  onChange(event) {
    this.search_for = event.target.value;
  }
  onSearchWith(event) {
    this.search_with = event.target.value;
  }

  showBrandDropdown() {
    return this.search_for == 'STORE';
  }
  showStoreDropdown() {
    return this.search_for == 'STORE' && ['STORE'].some(item => item == this.search_with);
  }
  showEzoneDropdown() {
    return this.search_for == 'STORE' && ['EZONE', 'STORE'].some(item => item == this.search_with);
  }
  showGeozoneDropdown() {
    return ['GEOZONE', 'EZONE', 'STORE'].some(item => item == this.search_with);
  }
  showCityDropdown() {
    return ['CITY', 'GEOZONE', 'EZONE', 'STORE'].some(item => item == this.search_with);
  }
  showStateDropdown() {
    return ['STATE', 'CITY', 'GEOZONE', 'EZONE', 'STORE'].some(item => item == this.search_with);
  }



 

  
  CreateNotification() {
    this.isCreateNotificaton = true;
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

  getProfileLabel() {
    this.notificationService.getProfileLabel().then((response: any) => {
      if (response.status) {
        if (response.status) {
          let records = response.message.records || [];
          // console.log("labels:", this.labels, "response:", response);
          records.forEach(record => {
            this.labels.push(record._fields[0]);
          });
          console.log("thisflsdf ", this.labels);
        }
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
    payload.label = this.notificationListData.controls.notificationList.value.label;

    if (this.search_for == 'GEOZONE') {
      payload.selected_match_type_brands = [];
      url = '/v2/geozone/notification/create/';
      payload.g_id = store_or_gzone_list;
    } else if (this.search_for == 'STORE') {      
      payload.selected_match_type_brands =  this.notificationListData.controls.notificationList.value.selected_match_type_brands.uuid ? [this.notificationListData.controls.notificationList.value.selected_match_type_brands.uuid] : [];//.map(brand => brand.br_id);
      url = '/v2/store/notification/create/';
      payload.st_id = [this.st_id];
    }
    this.notificationService.saveNotificationList(payload,url).then((response:any)=>{
      if(response.status){
        alert("Notification created successfully");
      }
    })
  }
}


