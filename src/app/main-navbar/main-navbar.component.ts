import { Component,EventEmitter,Output } from '@angular/core';
import { WorkspaceService } from '../services/workspace.service';
import { Workspace } from '../interfaces/workspace';
import { PopupCreateWorkspaceComponent } from '../popup-create-workspace/popup-create-workspace.component';
import {MatDialog,} from '@angular/material/dialog';
import { data } from 'jquery';
import { Router } from '@angular/router';
import { LoaderServicesService } from '../services/loader-services.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css'],
})
export class MainNavbarComponent {



  workspaces:Array<Workspace> = [];
  showLoader: boolean=true;
  currentUser: any = {};

  constructor(private loaderService:LoaderServicesService,private workspaceService:WorkspaceService,private dialog:MatDialog,private router:Router, private userService: UserService){
  }

  ngOnInit(){
    this.showLoader = true;

    this.userService.getCurrentUser().subscribe(
      res => this.currentUser = res,
      err => console.log(err)
    );

    setTimeout(()=>{
      this.workspaceService.getAllWorkspaces().subscribe(
        (res:any)=>{
          this.workspaces = res.data;
          this.showLoader =false;
        },
        (error) => {console.log(error);this.showLoader =false;}
      );
    },1000)
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(PopupCreateWorkspaceComponent, {
      data:{title:'',description:'',workspaces:this.workspaces},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
     this.workspaces = result.workspaces;
    });
  }

  selectWorkspace(workspace:Workspace){
    this.loaderService.display(true);
    this.workspaceService.SelectedWorkspace(workspace);
    this.router.navigate(['workspace',workspace.id]);
  }

  toggle: boolean = false;
  showAccountMenu(){
    this.toggle = !this.toggle;
  }


}
