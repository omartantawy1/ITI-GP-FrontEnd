import { Component } from '@angular/core';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css']
})
export class MainNavbarComponent {

  workspaces:Array<any> = [];
create:boolean=false;

addWorkspace(workspace:any){
this.workspaces.push(workspace);
}


}
