import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { NotificationsService } from '../../../../../services/notification-service';
@Component({
  selector: 'app-create-notifications',
  templateUrl: './create-notifications.component.html',
  styleUrls: ['../notifications.component.css']
})
export class CreateNotificationsComponent implements OnInit {
  textPlaceholder = 'Welcome {{user_name}} to {{geozone_name}}';
  subTextPlaceholder = '{{consumer_preferred_brands}} here';
  available_wildcards:any;
  available_wildcards_sub_text:any;
  search_for: string = 'GEOZONE';
  search_with: string = 'GEOZONE';
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
  selected_match_type_brands = [];
  brand_selected_for_current_search: any = {}
  search_query = {
    country: [], //this.city ? this.city.toLowerCase().trim(): "",
    city: [], //this.city ? this.city.toLowerCase().trim(): "",
    state: [], //this.state ? this.state.toLowerCase().trim(): "",
    geozone_name: [], //this.selected_geozone ? this.selected_geozone.name: "",
    store_name: [], //this.selected_store ? this.selected_store.name: "",
    ezone_name: [], //this.selected_ezone ? this.selected_ezone.name: "",
    brand: [], //this.selected_brand ? this.selected_brand.name: ""
  }
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
  constructor(private notificationService: NotificationsService, private fb: FormBuilder) {
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

  ngOnInit() {
    this.getCountry();
    this.getBrand();
    this.getNotificationType();
    this.getProfileLabel();
    this.getNotificationActionType();
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

  getState(event) {
    this.country = event.target.value;
    this.all_states_dropdown = [];
    this.all_city_dropdown = [];
    this.state = "";
    this.city = "";
    this.addUniqueToList(this.search_query.country, this.country);
    this.notificationService.getState(this.country).then((response: any) => {
      if (response.status) {
        this.all_states_dropdown = response.data ? response.data.map(item => item.state) : [];

      }
    })


  }

  getCities(event) {
    this.state = event.target.value;
    this.all_city_dropdown = [];
    this.city = "";
    this.addUniqueToList(this.search_query.state, this.state);
    this.notificationService.getCities({
      country: this.country,
      state: this.state
    }).then((response: any) => {
      if (response) {
        this.all_city_dropdown = response.data ? response.data.map(item => item.city) : [];
      }
    })
  }
  getZone(event) {
    this.city = event.target.value;
    this.geozone_dropdown = [];
    this.selected_geozone = null;
    this.addUniqueToList(this.search_query.city, this.city);
    this.notificationService.getZone(this.city).then((response: any) => {
      if (response) {
        this.geozone_dropdown = response.data;
      }
    })
  }

  getEzone(event) {
    this.zone = event.target.value;
    this.addUniqueToList(this.search_query.geozone_name, this.zone);
    this.notificationService.getEzones(this.zone).then((response: any) => {
      if (response.status) {
        this.ezone_dropdown = response.data;
      }
    })
  }

  getStores(event) {
    this.ezone = event.target.value;
    this.addUniqueToList(this.search_query.ezone_name, this.ezone);
    this.notificationService.getStores(this.ezone).then((response: any) => {
      if (response.status) {
        this.store_dropdown = response.data;
      }
    })
  }

  getBrandValue(event) {
    this.brand = event.target.value;
  }
  removeQueryParam(item, index, arr: []) {
    arr.splice(index, 1);
  }

  addUniqueToList(arr, index) {
    if (!(arr.indexOf(index) > -1)) {
      arr.push(index);
    }
  }

  filterZeozoneStoreForNotification() {
    this.selected_match_type_brands = [];
    this.brand_selected_for_current_search = this.brand && this.brand.name ? JSON.parse(JSON.stringify(this.brand)) : {};
    let query = {
      search_query: {
        country: this.search_with == 'COUNTRY' ? this.search_query.country : [],
        city: this.search_with == 'CITY' ? this.search_query.city : [],
        state: this.search_with == 'STATE' ? this.search_query.state : [],
        geozone_name: this.search_with == 'GEOZONE' ? this.search_query.geozone_name : [],
        store_name: this.search_with == 'STORE' ? this.search_query.store_name : [],
        ezone_name: this.search_with == 'EZONE' ? this.search_query.ezone_name : [],
        brand: this.brand ? this.brand.name : ""
      },
      search_for: this.search_for
    };
    var validation_error = [];
    if (this.search_with == 'COUNTRY' && query.search_query.country.length == 0) {
      validation_error.push('Select at least 1 country');
    }
    if (this.search_with == 'STATE' && query.search_query.state.length == 0) {
      validation_error.push('Select at least 1 state');
    }
    if (this.search_with == 'CITY' && query.search_query.city.length == 0) {
      validation_error.push('Select at least 1 city');
    }
    if (this.search_with == 'GEOZONE' && query.search_query.geozone_name.length == 0) {
      validation_error.push('Select at least 1 zone');
    }
    if (this.search_with == 'STORE' && query.search_query.store_name.length == 0) {
      validation_error.push('Select at least 1 store');
    }
    if (validation_error.length) {
      alert(validation_error);
    }
    else {
      this.notificationService.filterZeozoneStoreForNotification(query).then((response: any) => {
        if (response.status) {
          if (this.search_for == "GEOZONE") {
            this.response_title = "Geozone";
          } else if (this.search_for == "STORE") {
            this.response_title = "Store";
          }
          this.search_result = response.data;
          console.log(this.search_result)
        }
      })
    }

    console.log(query)
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
      console.log("*****", payload.name)
      payload.selected_match_type_brands = [];
      url = '/v2/geozone/notification/create/';
      payload.g_id = store_or_gzone_list;
    } else if (this.search_for == 'STORE') {
      payload.selected_match_type_brands = [this.brand_selected_for_current_search].map(brand => brand.br_id);
      url = '/v2/store/notification/create/';
      payload.st_id = store_or_gzone_list;
    }
    console.log(payload);
    // this.notificationListData.controls.notificationList.value.g_id=store_or_gzone_list;
    console.log(this.notificationListData.valid)

    // this.notificationService.saveNotificationList(payload,url).then((response:any)=>{
    //   if(response.status){

    //     console.log(response)
    //   }
    // })
  }
}


