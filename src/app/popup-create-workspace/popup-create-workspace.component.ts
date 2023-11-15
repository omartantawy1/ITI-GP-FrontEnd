import { Component,EventEmitter,Output } from '@angular/core';
import { WorkspaceService } from '../services/workspace.service';
import { Inject } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { Workspace } from '../interfaces/workspace';
import { Router } from '@angular/router';
import { LoaderServicesService } from '../services/loader-services.service';

@Component({
  selector: 'app-popup-create-workspace',
  templateUrl: './popup-create-workspace.component.html',
  styleUrls: ['./popup-create-workspace.component.css'],
})
export class PopupCreateWorkspaceComponent {


  showLoader: boolean=false;

  constructor(private loaderService:LoaderServicesService,private router:Router,private workspaceService:WorkspaceService,public dialogRef: MatDialogRef<PopupCreateWorkspaceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {title:string,description:string,workspaces:Array<Workspace>}){}

  addWorkspaceInModal() {
    this.showLoader = true;
    if (this.data.title.trim()!='') {
      this.workspaceService.createWorkspace(this.data).subscribe(
        (res:any)=>{ 
          this.data.workspaces.unshift(res.data);
          if(res.data){
            this.showLoader = false;
            this.loaderService.display(true);
            this.workspaceService.SelectedWorkspace(res.data);
            this.router.navigate(['workspace',res.data.id]);
          }
        },
        (error)=>{
          this.showLoader = false;
          console.log(error);
        }
      );

    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


}
