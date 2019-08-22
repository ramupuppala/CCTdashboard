import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ManageStaffService } from '../../../../../../services/manage-staff-service';
@Component({
  selector: 'app-assing-store',
  templateUrl: './assing-store.component.html',
  styleUrls: ['../../manage.component.css']
})
export class StoreManagerAssignStore implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute, private manageStaffService:ManageStaffService) { }
  stores=[];
  p_id:string='';
  getEzoneStores(){
    this.manageStaffService.getEzoneStores().then(((response: any) => {
      if (response.status) {
        this.stores = response.data;
        console.log(this.stores)
      }
    }));
  }

  ngOnInit() {
    this.p_id = this.route.snapshot.paramMap.get('id');
    this.getEzoneStores();
  }
  assignStore(id:string){
    let data={
      id:id,
      p_id:this.p_id
    }
    this.manageStaffService.assignStoreToStoreManager(data).then(((response: any) => {
      if (response.status) {       
        console.log(response.data);
        alert("Successfully Assigned")
      }
    }));
  }

}
