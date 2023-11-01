import { Component,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-popup-create-workspace',
  templateUrl: './popup-create-workspace.component.html',
  styleUrls: ['./popup-create-workspace.component.css']
})
export class PopupCreateWorkspaceComponent {

  Workspaces:any;
  newWorkspaceName = '';
  newWorkspaceNameInModal: string = '';
  newWorkspaceDescriptionInModal: string = '';


  @Output() newWorkspace=new EventEmitter<any>();

  addWorkspaceInModal() {
    if (this.newWorkspaceNameInModal) {
      const newWorkspace = {
        name: this.newWorkspaceNameInModal,
        description: this.newWorkspaceDescriptionInModal,
      };

      this.newWorkspaceNameInModal = '';
      this.newWorkspaceDescriptionInModal = '';
      this.newWorkspace.emit(newWorkspace); // Emit the new workspace data
    }
  }



}
