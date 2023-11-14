import { Component, HostListener } from '@angular/core';
import { Workspace } from '../interfaces/workspace';

@Component({
  selector: 'app-sidebar-with-workspace',
  templateUrl: './sidebar-with-workspace.component.html',
  styleUrls: ['./sidebar-with-workspace.component.css']
})
export class SidebarWithWorkspaceComponent {
  opened:boolean=false;
  showIconSide:boolean = false;

  workspaceSelect!:Workspace;


  ngOnInit(){
    this.opened=false;
    if(window.innerWidth<1000){
      this.showIconSide = true;
    }
  }

  toggleDrawer(flag:boolean){
    this.opened = flag;

  }

  addWorkspace(workspace:Workspace){
    this.workspaceSelect = workspace;

  }


  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
      if (event.target.innerWidth < 1000) {
          this.toggleDrawer(false);
          this.showIconSide = true
        }else{
          this.toggleDrawer(true);
          this.showIconSide = false;
          
      }
  }



  
}
