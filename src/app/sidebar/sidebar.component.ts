import { Component , Input, Output,EventEmitter } from '@angular/core';
import { Workspace } from '../interfaces/workspace';
import { WorkspaceService } from '../services/workspace.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Input() opened:boolean = true;
  workspaces:Array<Workspace> = [];
  @Output() closeSide = new EventEmitter<boolean>();

  constructor(private workspaceService:WorkspaceService,private router:Router){
  };

  ngOnInit(){
    setInterval(()=>{
      this.workspaceService.getAllWorkspaces().subscribe(
        (res:any)=>{
          this.workspaces = res.data
        },
        (error) => {console.log()}
      );
    },2000)
  }

  close(){
    this.closeSide.emit(false);
  }

  selectWorkspace(workspace:Workspace){
    this.workspaceService.SelectedWorkspace(workspace);
    this.router.navigate(['/workspace']);
  }

  
}
