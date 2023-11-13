import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { InvitationService } from '../services/invitation.service';
import { data } from 'jquery';
@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.css']
})

export class ShareDialogComponent {

  emailModel:string = "";
  usersShare: any[] = [
    {
      id: 1,
      username: "Omar Ashraf (You)",
      role: "Board Admin",
      imageUrl: "http://placekitten.com/500/500"
    },
    {
      id: 2,
      username: "rewas safwat",
      role: "Board member",
      imageUrl: "http://placekitten.com/510/510"
    },

  ];

  constructor(private invitationService:InvitationService){}

  dropdownOptions: string[] = ["Menu item 1", "Menu item 2", "Menu item 3"];

 
  removeUser(id: number) {
    this.usersShare = this.usersShare.filter(user => {
      return user.id !== id || user.role !== 'Board member';
    });
  }

  inviteUserToBoard(){
    if(this.emailModel){
      let invite = {
        "email": this.emailModel,
        "invitation_on": 'board',
        "invitation_on_id": 3
      }
      this.invitationService.sendInvitaion(invite).subscribe(
        (res:any)=>{
          if(res.data){
          let username = this.usersShare.findIndex(u=>u.username==this.emailModel);
          if(!username){
            this.usersShare.push({
              id:this.usersShare.length+1,
              username:this.emailModel,
              role:'board member',
              imageUrl:"http://placekitten.com/510/510"
              });
          }
          console.log(res.data);
          }
        }
      );
    }
  }

}