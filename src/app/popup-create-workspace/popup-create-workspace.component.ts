import { Component,EventEmitter,Output } from '@angular/core';
import { WorkspaceService } from '../services/workspace.service';
import { Inject } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { Workspace } from '../interfaces/workspace';

@Component({
  selector: 'app-popup-create-workspace',
  templateUrl: './popup-create-workspace.component.html',
  styleUrls: ['./popup-create-workspace.component.css'],
})
export class PopupCreateWorkspaceComponent {




  constructor(private workspaceService:WorkspaceService,public dialogRef: MatDialogRef<PopupCreateWorkspaceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {title:string,description:string,workspaces:Array<Workspace>}){}

  addWorkspaceInModal() {
    if (this.data.title.trim()!=''&&this.data.description.trim()!='') {
      this.workspaceService.createWorkspace(this.data).subscribe(
        (res:any)=>{ 
          this.data.workspaces.unshift(res.data);
          this.dialogRef.close();// Emit the new workspace data
        },
        (error)=>{console.log(error)}
      );

    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
