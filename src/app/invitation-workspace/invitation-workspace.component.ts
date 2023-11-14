import { Component } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';

import { Inject } from '@angular/core';
import { InvitationService } from '../services/invitation.service';

@Component({
  selector: 'app-invitation-workspace',
  templateUrl: './invitation-workspace.component.html',
  styleUrls: ['./invitation-workspace.component.css']
})
export class InvitationWorkspaceComponent {

  userAccount:string = '';
  constructor(private invitationService:InvitationService,public dialogRef: MatDialogRef<InvitationWorkspaceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {workspace_id:number}){}

  inviteUser() {
    if(this.data.workspace_id&&this.userAccount){

      let invitation = {
        'email':this.userAccount,
        'invitation_on':'workspace',
        'invitation_on_id':this.data.workspace_id
      }
      this.invitationService.sendInvitaion(invitation).subscribe(
        (res:any)=>{
          console.log(res);
          this.dialogRef.close();
        },
        (error)=>{console.log(error);}
      );
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
