import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ManageStaffService } from '../../../../../../services/manage-staff-service';
@Component({
  selector: 'app-assing-store',
  templateUrl: './assing-store.component.html',
  styleUrls: ['../../manage.component.css']
})
export class AssingStoreComponent implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute, private manageStaffService:ManageStaffService) { }
  stores=[];
  p_id:string='';
  getEzoneStoresForCustomercare(){
    this.manageStaffService.getEzoneStoresForCustomercare().then(((response: any) => {
      if (response.status) {
        this.stores = response.data;
        console.log(this.stores)
      }
    }));
  }

  ngOnInit() {
    this.p_id = this.route.snapshot.paramMap.get('id');
    this.getEzoneStoresForCustomercare();
    console.log("sdfsdfsdf")
  }
  assignStore(id:string){
    console.log(id);
    let data={
      id:id,
      p_id:this.p_id
    }
    this.manageStaffService.assignStore(data).then(((response: any) => {
      if (response.status) {       
        console.log(response.data);
        alert("Successfully Assigned")
      }
    }));
  }

}
