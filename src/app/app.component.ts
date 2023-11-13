import { Component , Input,HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TaskFlow';
  opened:boolean=false;

  ngOnInit(){
    this.opened=true;
  }

  toggleDrawer(flag:boolean){
    this.opened = flag;

  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
      if (event.target.innerWidth < 1000) {
          this.toggleDrawer(false);
        }else{
          this.toggleDrawer(true);
          
      }
  }
  
   workspace:any;
   getworkspace(workspace:any){
    this.workspace=workspace;
   }
   setWorkSpace(workspace:any){
    this.workspace=workspace;
   }

  }