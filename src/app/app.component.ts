import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TaskFlow';

   workspace:any;
   getworkspace(workspace:any){
    this.workspace=workspace;
   }
   setWorkSpace(workspace:any){
    this.workspace=workspace;
   }

  }