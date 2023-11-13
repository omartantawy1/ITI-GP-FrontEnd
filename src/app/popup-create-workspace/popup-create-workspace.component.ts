import { Component,EventEmitter,Output } from '@angular/core';
import { WorkspaceComponent } from '../workspace/workspace.component';

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
