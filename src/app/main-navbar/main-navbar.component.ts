import { Component,Input,Output } from '@angular/core';
import {EventEmitter } from '@angular/core';
import { WorkspaceService } from '../services/workspace.service';
import { Workspace } from '../interfaces/workspace';
@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css']
})
export class MainNavbarComponent {



  workspaces:Array<Workspace> = [];

  constructor(private workspaceService:WorkspaceService){
  }

  ngOnInit(){
    this.workspaceService.getAllWorkspaces().subscribe(
      (res:any)=>{
        this.workspaces = res.data;
      },
      (error)=>{console.log(error);}
    );
  }



}
