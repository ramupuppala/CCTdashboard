import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { GeoZoneListService } from '../../../../../../services/geozone-list-service';

@Component({
  selector: 'app-enagagement-zone-create',
  templateUrl: './enagagement-zone-create.component.html',
  styleUrls: ['./enagagement-zone-create.component.css']
})
export class EnagagementZoneCreateComponent implements OnInit {
  public engagementzoneList: FormGroup;
  public submitted = false;
  public g_id = "";
  public e_id = "";
  public takeManualCityState: boolean = false;

  public isLocation = (value) => value.split(",")[0] != '' && value.split(",")[0] != undefined && value.split(",")[1] != '' && value.split(",")[1] != undefined && !isNaN(parseInt(value.split(",")[0].trim())) && !isNaN(parseInt(value.split(",")[1].trim()))


  ngOnInit() {
    this.g_id = this.route.snapshot.paramMap.get('g_id');
    this.e_id = this.route.snapshot.paramMap.get('e_id');

    if (this.e_id != undefined) {
      this.getEngagementList();
    }
    else {
      this.getGeozoneList();
    }
  }

  getEngagementList() {
    this.geozoneService.getEngagementzoneById({ e_id: this.e_id, g_id: this.g_id }).then((response: any) => {
      if (response.status) {
        this.engagementzoneList = this.fb.group({
          "geozoneList": this.fb.group({
            "name": [response.data[0].name, Validators.required],
            "location": [response.data[0].location, Validators.required],
            "img_url": [response.data[0].img_url],
            "mute_duration": [response.data[0].mute_duration, Validators.required],
            "expiry_timestamp": [new Date(new Date().setFullYear(new Date().getFullYear() + 1)), Validators.required],
            "is_active": [response.data[0].is_active, Validators.required],
            "radius": [response.data[0].radius, Validators.required],
            "loitering_delay": [response.data[0].loitering_delay, Validators.required],
          })
        })
      }
    })
  }

  getGeozoneList() {
    this.geozoneService.getGeozoneListDataById(this.g_id).then((response: any) => {
      if (response.status) {
        this.engagementzoneList = this.fb.group({
          "geozoneList": this.fb.group({
            "name": [response.data[0].name, Validators.required],
            "location": [response.data[0].location, Validators.required],
            "img_url": [response.data[0].img_url],
            "mute_duration": [response.data[0].mute_duration, Validators.required],
            "expiry_timestamp": [new Date(new Date().setFullYear(new Date().getFullYear() + 1)), Validators.required],
            "is_active": [response.data[0].is_active, Validators.required],
            "radius": [response.data[0].radius, Validators.required],
            "loitering_delay": [response.data[0].loitering_delay, Validators.required],
          })
        });
      }
    })
  }

  public errorMsg: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private geozoneService: GeoZoneListService, private fb: FormBuilder) {
    this.engagementzoneList = fb.group({
      "geozoneList": fb.group({
        "name": [null, Validators.required],
        "location": [null, Validators.required],
        "img_url": [""],
        "mute_duration": [0, Validators.required],
        "expiry_timestamp": [new Date(new Date().setFullYear(new Date().getFullYear() + 1)), Validators.required],
        "is_active": [true, Validators.required],
        "radius": [500, Validators.required],
        "loitering_delay": [30000, Validators.required],
      })
    });
  }
  public fieldInput() {
    this.errorMsg = false;
  }
  public creategeozoneList() {

    if (this.engagementzoneList.valid) {
      if (!this.isLocation(this.engagementzoneList.controls.geozoneList.value.location)) {
        alert("lat lan invalid");

      }
      else {
        this.storeGeoZone();
      }
    }

  }
  storeGeoZone() {
    let url='';
    let payload: any = {
      properties: {
        name: this.engagementzoneList.controls.geozoneList.value.name,
        img_url: this.engagementzoneList.controls.geozoneList.value.img_url,
        location: this.engagementzoneList.controls.geozoneList.value.location,
        is_active: this.engagementzoneList.controls.geozoneList.value.is_active,
        call_to_action_text: this.engagementzoneList.controls.geozoneList.value.call_to_action_text,
        radius: parseFloat(this.engagementzoneList.controls.geozoneList.value.radius),
        loitering_delay: parseFloat(this.engagementzoneList.controls.geozoneList.value.loitering_delay),
        expiry_timestamp: new Date(this.engagementzoneList.controls.geozoneList.value.expiry_timestamp).getTime(),
        mute_duration: Number(this.engagementzoneList.controls.geozoneList.value.mute_duration)
      }

    }
    payload.g_id = this.g_id;

    if (this.e_id != undefined) {
      payload.e_id=this.e_id;
      url='/v1/engagement-zone/update/';
      this.geozoneService.createEngagementZoneList(payload,url).then(((response: any) => {
        if (response.status) {
          this.router.navigate(['engagement-zone-list/',this.g_id]);
        }
        else {
          alert(response.validation)
        }
      }))
    }
    else {
      url='/v1/engagement-zone/create/';
      this.geozoneService.createEngagementZoneList(payload,url).then(((response: any) => {
        if (response.status) {
          this.router.navigate(['engagement-zone-list/',this.g_id]);
        }
        else {
          alert(response.validation)
        }
      }))
    }
  }
}

