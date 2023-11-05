import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-invite',
  templateUrl: './user-invite.component.html',
  styleUrls: ['./user-invite.component.css']
})
export class UserInviteComponent {
  constructor(private router: Router) {}
acceptInvitation(){
  this.router.navigate(['/board']);
}

DeclineInvitation(){
  this.router.navigate(['/home']);
}

}
