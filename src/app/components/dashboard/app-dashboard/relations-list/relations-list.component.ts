import { Component, OnInit } from '@angular/core';
import { RelationsListService } from 'src/app/services/relations-list-service';

@Component({
  selector: 'app-relations-list',
  templateUrl: './relations-list.component.html',
  styleUrls: ['./relations-list.component.css']
})
export class RelationsListComponent implements OnInit {
  relations:any;
  constructor(private relationsListService:RelationsListService) { }

  ngOnInit() {
    this.relationsListService.getRelationsListData().then((response:any)=>{
      if(response.status){
        console.log(response);
        this.relations=response.data;
      }
    })
  }

  selectedRole(event){
    console.log("event",event.target.value);
  }

}
