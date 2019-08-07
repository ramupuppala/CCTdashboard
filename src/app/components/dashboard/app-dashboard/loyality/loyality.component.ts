import { Component, OnInit } from '@angular/core';
import { LoyalityService } from '../../../../services/loyality-service';


export interface LoyalityListDetails {
  [index: number]: {
    label?: string;
    description?: string;
    label_id?: string;
    rank?: number;
    status?: boolean;
  };
}


@Component({
  selector: 'app-loyality',
  templateUrl: './loyality.component.html',
  styleUrls: ['./loyality.component.css']
})
export class LoyalityComponent implements OnInit {

  constructor(private loyalityService: LoyalityService) { }

  loyalityList: LoyalityListDetails = [];

  displayLoyalityList(){
    this.loyalityService.getLoyalityList().then(((data: any) => {
      if (data.status) {
        this.loyalityList = data.data;
      }
    }));
  }

  ngOnInit() {
    this.displayLoyalityList();
  }

  isActiveRemove(label:string,status:boolean){
    let data={
      label:label,
      isActive:!status
    }
    this.loyalityService.changeActiveState(data).then(((data: any) => {
      if (data.status) {
       console.log(data.status)
       this.displayLoyalityList();
      }
    }));
  }
}
