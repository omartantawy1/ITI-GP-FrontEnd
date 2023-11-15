import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvitationService } from '../services/invitation.service';
import { error } from 'jquery';
@Component({
  selector: 'app-user-invite',
  templateUrl: './user-invite.component.html',
  styleUrls: ['./user-invite.component.css']
})
export class UserInviteComponent {
  invitaionId!:number;
  constructor(private router: Router,private route:ActivatedRoute,private invitationService:InvitationService) {
    this.route.queryParams.subscribe(params => {
      let data = params['id']  ;
      if(data){
        this.invitaionId = data;
      }
    });

  }
acceptInvitation(){
  this.invitationService.accept(this.invitaionId).subscribe(
    (res:any)=>{
      this.router.navigate(['/workspace']);
    },
    (error)=>{console.log(error)},
  );
}

declineInvitation(){
  this.invitationService.decline(this.invitaionId).subscribe(
    (res:any)=>{
      this.router.navigate(['/home']);
    },
    (error)=>{console.log(error)}
  );
}

}
