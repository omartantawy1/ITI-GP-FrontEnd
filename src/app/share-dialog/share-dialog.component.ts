import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.css']
})

export class ShareDialogComponent {
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
      role: "Board Guest",
      imageUrl: "http://placekitten.com/510/510"
    },

  ];

  dropdownOptions: string[] = ["Menu item 1", "Menu item 2", "Menu item 3"];

 
  removeUser(id: number) {
    this.usersShare = this.usersShare.filter(user => {
      return user.id !== id || user.role !== 'Board Guest';
    });
  }


  

}