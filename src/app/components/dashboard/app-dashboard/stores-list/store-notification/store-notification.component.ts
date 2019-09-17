import { Component, OnInit } from '@angular/core';
import { StoreListService } from '../../../../../services/store-list-service';
import { NotificationsService } from '../../../../../services/notification-service';
import { ActivatedRoute,Router} from '@angular/router';
@Component({
  selector: 'app-store-notification',
  templateUrl: './store-notification.component.html',
  styleUrls: ['../stores-list.component.css']
})
export class StoreNotificationComponent implements OnInit {

  st_id="";
  e_id="";
  storeNotifications=[];
  storeNameAttribute= [];
  storeDetails:any;
  constructor( private storeService:StoreListService,private notificationService : NotificationsService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.st_id=this.route.snapshot.paramMap.get('st_id');
    this.e_id=this.route.snapshot.paramMap.get('e_id');
    this.getStoreNotifications();
    this.getStore();
  }

  getStoreNotifications(){
    this.storeService.getStoreNotifications({
      st_id:this.st_id
    }).then((response:any)=>{
      if(response.status){
        this.storeNotifications=response.data;
      }
    })
  }

  getStore(){
    this.storeService.getStore({
      st_id:this.st_id,
      e_id:this.e_id
    },'/v1/store/get/').then((response:any)=>{
      if(response.status){
        this.storeDetails=response.data[0];
        this.storeNameAttribute=this.storeDetails.store_attributes.filter((item)=>{
          return item.key == 'name'
        })
      }
    })
  }

  deleteStoreNotification(nt_id){
    this.notificationService.deleteStoreNotification({
      g_id:null,
      nt_id:nt_id,
      st_id:this.st_id
    }).then((response:any)=>{
      if(response.status){
        alert("Successfully Deleted");
        this.getStoreNotifications();
      }
    })
  }

}
