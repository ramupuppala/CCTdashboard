import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { NotificationsService } from '../../../../../services/notification-service';
@Component({
  selector: 'app-edit-notifications',
  templateUrl: './edit-notifications.component.html',
  styleUrls: ['../notifications.component.css']
})
export class EditNotificationsComponent implements OnInit {

  textPlaceholder = 'Welcome {{user_name}} to {{geozone_name}}';
  subTextPlaceholder = '{{consumer_preferred_brands}} here';
  nt_id:string="";
  available_wildcards:any;
  available_wildcards_sub_text:any;
  search_for: string = '';
  search_with: string = 'GEOZONE';
  isCreateNotificaton: boolean = false;
  response_title: string = "";
  country: string = "";
  state: string = "";
  city: string = "";
  zone: string = "";
  ezone: string = "";
  brand: any = {};
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
  geozone_names=[];
  g_ids=[];
  st_ids=[];
  associated_stores=[];
  associated_zones=[];
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
  constructor(private notificationService: NotificationsService, private fb: FormBuilder,private router: Router,private route: ActivatedRoute, ) {
    this.available_wildcards=["{{user_name}}", "{{store_name}}", "{{geozone_name}}", "{{ezone_name}}"];
    this.available_wildcards_sub_text= ["{{consumer_preferred_brands}}"]
   
    
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
        "notification_match_type": ["", Validators.required],
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
        "label": [""],
        "inventory_request_params": [""]
      })
    });
  }


  getCountry() {
    this.notificationService.getCountry().then(((response: any) => {
      if (response.status) {
        this.all_country_dropdown = response.data ? response.data.map(item => item.country) : [];
        
        
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
    this.nt_id = this.route.snapshot.paramMap.get('nt_id');
    this.search_for = this.route.snapshot.paramMap.get('search');
    this.getCountry();
    this.getBrand();
    this.getNotificationType();
    this.getProfileLabel();
    this.getNotificationActionType();
    this.getNotificationListData();
    
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
          
          records.forEach(record => {
            this.labels.push(record._fields[0]);
          });
          
        }
      }
    })
  }

  getNotificationListData(){
    this.notificationService.notificationListData({nt_id:this.nt_id,search_for:this.search_for}).then((response:any)=>{
      if(response.status){
        this.g_ids= response.data[0].g_ids ? response.data[0].g_ids : [];
        this.st_ids= response.data[0].st_ids ? response.data[0].st_ids : [];
        this.associated_stores = response.data[0].store_names ? response.data[0].store_names : [];
        this.associated_zones = response.data[0].geozone_names ? response.data[0].geozone_names : [];

        console.log("response ",this.associated_zones);
        const active_days=JSON.parse(response.data[0].notification[0].active_days)
        this.notificationListData = this.fb.group({
          "notificationList": this.fb.group({
            "text": [response.data[0].notification[0].text, Validators.required],
            "subtext": [response.data[0].notification[0].sub_text],
            "action_url": [response.data[0].notification[0].action_url],
            "image_url": [response.data[0].notification[0].image_url],
            "isActive": [response.data[0].notification[0].isActive],
            "notification_match_type": [response.data[0].notification[0].notification_match_type, Validators.required],
            "validity_end": [new Date(response.data[0].notification[0].validity_end)],
            "validity_start": [new Date(response.data[0].notification[0].validity_start)],
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
            "label": [null],
            "inventory_request_params": [null]
          })
        });
      }
    })
  }

  saveNotificationList() {    
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
    payload.name = this.notificationListData.controls.notificationList.value.label;
    payload.nt_id=this.nt_id;
    if (this.search_for == 'GEOZONE') {
      
      payload.selected_match_type_brands = [];
      url = '/v2/geozone/notification/update/';
      payload.g_id = this.g_ids;
    } else if (this.search_for == 'STORE') {
      payload.selected_match_type_brands = [this.brand_selected_for_current_search].map(brand => brand.br_id);
      url = '/v2/store/notification/update/';
      payload.st_id = this.st_ids;
    }
    this.notificationService.saveNotificationList(payload,url).then((response:any)=>{
      if(response.status){
        alert("successfully Updated ");
        this.router.navigate(['notifications']); 
      }
    })
  }
}


