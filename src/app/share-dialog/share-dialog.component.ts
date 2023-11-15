import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { InvitationService } from '../services/invitation.service';
import { data } from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { BoardInterface } from '../interfaces/board-interface';
import { BoardService } from '../services/board.service';
@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.css']
})

export class ShareDialogComponent {

  emailModel:string = "";
    board!:BoardInterface;
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

  constructor(private boardService:BoardService,private invitationService:InvitationService,private route:ActivatedRoute){
    
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      let data = params['id']  ;
      if(data){
        this.boardService.getBoard(data).subscribe(
          (res:any)=>{
            this.board = res.data;
          },
          (error)=>{
            console.log(error);
          }
          );
      }

    });
  }

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