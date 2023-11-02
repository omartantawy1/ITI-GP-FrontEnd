import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {


  // listuser?:any;
  // constructor(private workspace:WorkspaceService){}
  // ngOnInit(){
  
  //   this.workspace.getAllUsers().subscribe(
  //     (users:any)=>(this.listuser=users),
  //     (error)=>console.log(error.message)
  //   );
  // }
  
  sidebar(){
  let sidebar= document.getElementById("side-bar");
  sidebar!.classList.toggle("hidden");
  
  }

}
