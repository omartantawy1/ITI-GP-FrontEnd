import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-sidebar-with-workspace',
  templateUrl: './sidebar-with-workspace.component.html',
  styleUrls: ['./sidebar-with-workspace.component.css']
})
export class SidebarWithWorkspaceComponent {
  opened:boolean=false;
  showIconSide:boolean = false;

  ngOnInit(){
    this.opened=false;
    if(window.innerWidth<1000){
      this.showIconSide = true;
    }
  }

  toggleDrawer(flag:boolean){
    this.opened = flag;

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
