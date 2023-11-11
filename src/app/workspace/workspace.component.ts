import { Component } from '@angular/core';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent {
  myWorkspaces: { id: number, name: string, description: string }[] = []; // Update to include description
  workspaces: { id: number, name: string }[] = [];
  newWorkspaceName = '';
  selectedWorkspaceId: number = 0;
  newWorkspaceNameInModal: string = '';
  newWorkspaceDescriptionInModal: string = ''; // Add description variable
  boards: { workspaceId: number, title: string,background:string}[] = [];
  newBoardName = '';

  selectedColorIndex = -1;

  isCreateBoardSectionVisible = false;



  isCreateBoardVisible = false;

  toggleCreateBoardSection() {
    this.isCreateBoardVisible = !this.isCreateBoardVisible;
  }

  toggleSelectedColor(index: number) {
    this.selectedColorIndex = this.selectedColorIndex === index ? -1 : index;
  }

 

// Board selectors options


addWorkspaceInModal() {
  if (this.newWorkspaceNameInModal) {
    const id = this.workspaces.length + 1;
    const newWorkspace = {
      id,
      name: this.newWorkspaceNameInModal,
      description: this.newWorkspaceDescriptionInModal,
    };
    this.workspaces.push(newWorkspace);
    this.myWorkspaces.push(newWorkspace);
    this.newWorkspaceNameInModal = '';
    this.newWorkspaceDescriptionInModal = '';
    console.log('Updated Workspaces:', this.workspaces);
    console.log('Boards:', this.boards); // Log the boards when a workspace is added
  }
}

  backgroundColors: string[] = [
    'linear-gradient(to right, #ff9966, #ff5e62)',
    'linear-gradient(to right, #AA076B, #61045F)',
    'linear-gradient(to right, #348F50, #56B4D3)',
    'linear-gradient(to right, #2b5876, #4e4376)',
    'linear-gradient(to right,#355C7D, #6C5B7B,#C06C84)',
    'linear-gradient(to right, #ec008c, #fc6767)',
    'linear-gradient(to right, #0F2027, #2C5364)',
  ];




  createBoard() {
    if (this.newBoardName && this.selectedColorIndex >= 0) {

      const newBoard = {
        workspaceId: this.selectedWorkspaceId,
        title: this.newBoardName,
        background: this.backgroundColors[this.selectedColorIndex],
      };
      this.boards.push(newBoard);
      this.newBoardName = '';
      this.isCreateBoardVisible = false;
      console.log('Updated Boards:', this.boards); // Log the boards when a new board is created
    }
  }


  
  selectWorkspace(workspaceId: number) {
    this.selectedWorkspaceId = workspaceId;
  }


  getSelectedWorkspaceName(): string {
    const selectedWorkspace = this.workspaces.find(workspace => workspace.id === this.selectedWorkspaceId);
    return selectedWorkspace ? selectedWorkspace.name : '';
  }
  
  getBoardsInSelectedWorkspace() {
    return this.boards.filter(board => board.workspaceId === this.selectedWorkspaceId);
  }

}
