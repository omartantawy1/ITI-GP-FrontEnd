import { Component,Input,Output } from '@angular/core';
import {EventEmitter } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css']
})
export class MainNavbarComponent {

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
      color:'#714ae9',
    },
    {
      id:3,
      title:'workbench',
      color:'#722245',
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
      color:'#065fd4',
    },
    {
      id:2,
      title:'Ai task',
      color:'#06effa',
    },
  ]
  },
  
];
create:boolean=false;

addWorkspace(workspace:any){
this.workspaces.push(workspace);
}

@Output() selectedworkspace = new EventEmitter<any>();
selectWorkspace(workspace:any){
  this.selectedworkspace.emit(workspace);
}

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
