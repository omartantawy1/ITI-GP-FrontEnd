import { Component,Input,Output } from '@angular/core';
import {EventEmitter } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css']
})
export class MainNavbarComponent {


  @Input() openedFlag:boolean = false;

  @Output() opened = new EventEmitter<boolean>();

  toggleDrawer(){
    this.openedFlag = !this.openedFlag;
    this.opened.emit(this.openedFlag);
  }


  workspaces:Array<any> = [
    {
      id:1,
      name:'Workpsace',
      description:"new workspace",
      boards:[{
        id:1,
        title:'Workpsace1',
        color:'red',
      },
      {
        id:2,
        title:'workboard',
        color:'purble',
      },
      {
        id:3,
        title:'workbench',
        color:'fuschia',
      }
    ]
    },
    {
      id:2,
      name:'rewas',
      description:"new workspace",
      boards:[{
        id:1,
        title:'gp task',
        color:'red',
      },
      {
        id:2,
        title:'Ai task',
        color:'purble',
      },
    ]




@Input() updateWorkSpace(workspace:any){
  let index= this.workspaces.indexOf(this.workspaces.find(w => w.id === workspace.id));
  this.workspaces[index] = workspace;
}
createWorkspace(){
this.create=!this.create;
}

faUser = faUser;
  @Input() openedFlag:boolean = true;

  @Output() opened = new EventEmitter<boolean>();

  toggleDrawer(){
    this.openedFlag = !this.openedFlag;
    this.opened.emit(this.openedFlag);
  }


}
