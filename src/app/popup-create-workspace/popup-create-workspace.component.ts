import { Component,EventEmitter,Output } from '@angular/core';
import { WorkspaceComponent } from '../workspace/workspace.component';
import { WorkspaceService } from '../services/workspace.service';

@Component({
  selector: 'app-popup-create-workspace',
  templateUrl: './popup-create-workspace.component.html',
  styleUrls: ['./popup-create-workspace.component.css']
})
export class PopupCreateWorkspaceComponent {

  newWorkspaceName = '';
  newWorkspaceNameInModal: string = '';
  newWorkspaceDescriptionInModal: string = '';


  @Output() newWorkspace=new EventEmitter<any>();

  constructor(private workspaceService:WorkspaceService){}

  addWorkspaceInModal() {
    if (this.newWorkspaceNameInModal) {
      let newWorkspace = {
        'title': this.newWorkspaceNameInModal,
        'description': this.newWorkspaceDescriptionInModal,
      };
      this.workspaceService.createWorkspace(newWorkspace).subscribe(
        (res:any)=>{
          this.newWorkspaceNameInModal = '';
          this.newWorkspaceDescriptionInModal = '';
          this.newWorkspace.emit(newWorkspace); // Emit the new workspace data
        },
        (error)=>{console.log(error)}
      );

    }
  }

}
