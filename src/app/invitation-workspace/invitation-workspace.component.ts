import { Component,Inject } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { InvitationService } from '../services/invitation.service';


@Component({
  selector: 'app-invitation-workspace',
  templateUrl: './invitation-workspace.component.html',
  styleUrls: ['./invitation-workspace.component.css']
})
export class InvitationWorkspaceComponent {

  userAccount:string = '';
  showLoader: boolean=false;
  error:string = '';
  
  constructor(private invitationService:InvitationService,public dialogRef: MatDialogRef<InvitationWorkspaceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {workspace_id:number,message:string}){}
    
    inviteUser() {
    this.error = '';
    this.showLoader = true;
    if(this.data.workspace_id&&this.userAccount){
      
      let invitation = {
        'email':this.userAccount,
        'invitation_on':'workspace',
        'invitation_on_id':this.data.workspace_id
      }
      this.invitationService.sendInvitaion(invitation).subscribe(
        (res:any)=>{
          console.log("response ",res);
          this.error = res.message
          this.showLoader = false;
        },
        (error)=>{
          console.log("error ",error);
          this.error = error.error.message;
          this.showLoader = false;
          
        }
        );
      }else{
        this.error = 'No user Account';
      this.showLoader = false;
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  ngOnInit(){
    this.error = '';

  }

}
