import { Component , Input, Output,EventEmitter } from '@angular/core';
import { Workspace } from '../interfaces/workspace';
import { WorkspaceService } from '../services/workspace.service';
import { error } from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Input() opened:boolean = true;
  workspaces:Array<Workspace> = [];
  @Output() closeSide = new EventEmitter<boolean>();

  constructor(private workspaceService:WorkspaceService){};

  ngOnInit(){
    setInterval(()=>{
      this.workspaceService.getAllWorkspaces().subscribe(
        (res:any)=>{
          this.workspaces = res.data
        },
        (error) => {console.log()}
      );
    },3000)
  }

  close(){
    this.closeSide.emit(false);
  }
  
  
}
