import { Component , Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'graduation_project';
   workspace:any;
   getworkspace(workspace:any){
    this.workspace=workspace;
   }
   setWorkSpace(workspace:any){
    this.workspace=workspace;
   }

  }