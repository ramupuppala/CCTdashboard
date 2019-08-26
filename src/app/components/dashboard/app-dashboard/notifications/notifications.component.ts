import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../../../services/notification-service'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private notificationService:NotificationsService) { }

  notificationList:any;
  search_for:string="GEOZONE";

  getNotificationList(){
    this.notificationService.getNotificationsList(this.search_for).then((response:any)=>{
      if(response.status){
        console.log(response);
        this.notificationList=response.data;

      }
    })
  }
  ngOnInit() {
    this.getNotificationList();
  }


  onChange(event){
    this.search_for=event.target.value;
  }
 
  onDelete(nt_id:string){
    console.log(nt_id)
    this.notificationService.deleteNotificationList(nt_id).then((response:any)=>{
      console.log(response);
      if(response.status){
        this.getNotificationList();
      }
    })
  }
}
