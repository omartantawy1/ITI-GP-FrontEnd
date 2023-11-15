import { Component , Input, Output,EventEmitter } from '@angular/core';
import { Workspace } from '../interfaces/workspace';
import { WorkspaceService } from '../services/workspace.service';
import { Router } from '@angular/router';
import { LoaderServicesService } from '../services/loader-services.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Input() opened:boolean = true;
  workspaces:Array<Workspace> = [];
  @Output() closeSide = new EventEmitter<boolean>();
  showLoader: boolean=true;

  constructor(private loaderService:LoaderServicesService,private workspaceService:WorkspaceService,private router:Router){
  };


  ngOnInit(){
    this.showLoader = true;
    setTimeout(()=>{
      this.workspaceService.getAllWorkspaces().subscribe(
        (res:any)=>{
          this.workspaces = res.data;
          console.log(true);
          this.showLoader = false;
          
        },
        (error) => {console.log()}
      );
    },1000)
  }

  close(){
    this.closeSide.emit(false);
  }

  selectWorkspace(workspace:Workspace){
    this.loaderService.display(true);
    this.workspaceService.SelectedWorkspace(workspace);
    this.router.navigate(['workspace',workspace.id]);
  }

  
}
