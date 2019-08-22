import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ManageStaffService } from '../../../../../../services/manage-staff-service';
@Component({
  selector: 'app-assigned-store',
  templateUrl: './assigned-store.component.html',
  styleUrls: ['../../manage.component.css']
})
export class AssignedStoreComponent implements OnInit {
  constructor(private router: Router,private route: ActivatedRoute,private manageStaffService:ManageStaffService) { }
  stores=[];
  p_id:string="";
  getAssignedStoreListCustomercare(){
    this.manageStaffService.getAssignedStoreListCustomercare(this.p_id).then(((response: any) => {
      if (response.status) {
        this.stores = response.data;
        console.log(this.stores)
      }
    }));
  }

  ngOnInit() {
    this.p_id = this.route.snapshot.paramMap.get('id');
    this.getAssignedStoreListCustomercare();
    console.log("sdfsdfsdf")
  }
  unSubscribeToStore(id:string){
   let data={
     id:id,
     p_id:this.p_id
   }
    this.manageStaffService.unSubscribeToStore(data).then(((response: any) => {
      if (response.status) {      
        alert("Successfully Unsubscribe"); 
        this.getAssignedStoreListCustomercare();
      }
    }));
  }

}
