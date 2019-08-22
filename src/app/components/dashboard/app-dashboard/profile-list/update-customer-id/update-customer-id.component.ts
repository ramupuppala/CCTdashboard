import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ProfileListService } from '../../../../../services/profile-list-service';

@Component({
  selector: 'app-update-customer-id',
  templateUrl: './update-customer-id.component.html',
  styleUrls: ['./update-customer-id.component.css']
})
export class UpdateCustomerIdComponent implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute, private profileListService:ProfileListService) { }
  p_id:string="";
  customer_id:string="";

  ngOnInit() {
    this.p_id = this.route.snapshot.paramMap.get('p_id');
    this.customer_id = this.route.snapshot.paramMap.get('customer_id');
    console.log(this.p_id,this.customer_id);
  }

  updateCadidateId(){
    this.profileListService.updateCandidate({p_id:this.p_id,customer_id:this.customer_id}).then(((response: any) => {
      if (response.status) {
        this.router.navigate(['profile-list']);
      }
    }));
  }
}
