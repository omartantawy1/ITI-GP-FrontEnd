import { Component , Input } from '@angular/core';

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
  @Input() workspace!: {  name: string,description:string };
  
  sidebar(){
  let sidebar= document.getElementById("side-bar");
  sidebar!.classList.toggle("hidden");
  }

 getInitials(workspaceName:string): string {
  return workspaceName.charAt(0).toUpperCase();
 }
}
