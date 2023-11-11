import { Component,ViewChild,ElementRef,AfterViewInit,OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PopupCreateWorkspaceComponent } from '../popup-create-workspace/popup-create-workspace.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent  {
  
  constructor(private router: Router) { }
  myWorkspaces: { id: number, name: string, description: string }[] = []; 
  workspaces: { id: number, name: string ,description: string}[] = [];
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


  deleteBoard(board: { workspaceId: number, title: string, background: string }) {
    const index = this.boards.findIndex(b => b.workspaceId === board.workspaceId && b.title === board.title && b.background === board.background);
    if (index !== -1) {
      this.boards.splice(index, 1);
      console.log('Updated Boards:', this.boards);
    }
  }

  
 isDeleteConfirmationModalVisible = false;
  boardToDelete: { workspaceId: number, title: string, background: string } | null = null;

  openDeleteConfirmationModal(board: { workspaceId: number, title: string, background: string }) {
    this.boardToDelete = board;
    this.isDeleteConfirmationModalVisible = true;
  }

  closeDeleteConfirmationModal() {
    this.isDeleteConfirmationModalVisible = false;
    this.boardToDelete = null;
  }

  confirmDeleteBoard() {
    if (this.boardToDelete) {
      this.deleteBoard(this.boardToDelete);
      this.closeDeleteConfirmationModal();
    }
  }

  
  

  getSelectedWorkspaceName(): string {
    const selectedWorkspace = this.workspaces.find(workspace => workspace.id === this.selectedWorkspaceId);
    return selectedWorkspace ? selectedWorkspace.name : '';
  }
  
  getSelectedWorkspaceDescription(): string {
    const selectedWorkspace = this.workspaces.find(workspace => workspace.id === this.selectedWorkspaceId);
    return selectedWorkspace ? selectedWorkspace.description : '';
  }
  
  getBoardsInSelectedWorkspace() {
    return this.boards.filter(board => board.workspaceId === this.selectedWorkspaceId);
  }

  isWorkspaceSelected: boolean = false;

  // ... existing code ...

  selectWorkspace(workspaceId: number) {
    this.selectedWorkspaceId = workspaceId;
    this.isWorkspaceSelected = true;
  
    // Find the selected workspace
    const selectedWorkspace = this.workspaces.find(workspace => workspace.id === this.selectedWorkspaceId);
  
    // Log the name and description of the selected workspace
    if (selectedWorkspace) {
      console.log('Selected Workspace Name:', selectedWorkspace.name);
      console.log('Selected Workspace Description:', selectedWorkspace.description);
    }
  }




  isWorkspaceEditMode: boolean = false;

  startEditWorkspace() {
    this.isWorkspaceEditMode = true;
  
  }
  
  saveEditedWorkspace() {
    if (this.newWorkspaceName && this.selectedWorkspaceId) {
      const index = this.workspaces.findIndex(workspace => workspace.id === this.selectedWorkspaceId);
      if (index !== -1) {
        this.workspaces[index].name = this.newWorkspaceName;
        this.workspaces[index].description = this.newWorkspaceDescriptionInModal;
        // Reset edit mode after saving
        this.isWorkspaceEditMode = false;
      }
    }
  }


  cancelEditWorkspace() {
    if (!this.newWorkspaceName) {
      this.newWorkspaceName = this.getSelectedWorkspaceName();
    }
  
    if (!this.newWorkspaceDescriptionInModal) {
      this.newWorkspaceDescriptionInModal = this.getSelectedWorkspaceDescription();
    }
  
    this.isWorkspaceEditMode = false;
  }
  



  isDeleteWorkspaceConfirmationModalVisible = false;
workspaceToDelete: { id: number, name: string, description: string } | null = null;

openDeleteWorkspaceConfirmationModal(workspace: { id: number, name: string, description: string } | undefined) {
  if (workspace) {
    this.workspaceToDelete = workspace;
    this.isDeleteWorkspaceConfirmationModalVisible = true;
  }
}

closeDeleteWorkspaceConfirmationModal() {
  this.isDeleteWorkspaceConfirmationModalVisible = false;
  this.workspaceToDelete = null;
}


isWorkspaceDeleted = false;

confirmDeleteWorkspace() {
  if (this.workspaceToDelete) {
    const index = this.workspaces.findIndex(workspace => workspace.id === this.workspaceToDelete!.id);
    if (index !== -1) {
      // Delete the workspace and its boards
      this.workspaces.splice(index, 1);
      this.boards = this.boards.filter(board => board.workspaceId !== this.workspaceToDelete!.id);

      // Set the flag to true when the workspace is deleted
      this.isWorkspaceDeleted = true;

      // Update myWorkspaces
      this.myWorkspaces = this.workspaces.slice(); // Create a copy of workspaces

      // Log the updated workspaces and boards
      console.log('Updated Workspaces:', this.workspaces);
      console.log('Updated Boards:', this.boards);

      // Reset variables and close the modal
      this.workspaceToDelete = null;
      this.isDeleteWorkspaceConfirmationModalVisible = false;

      // Reset the flag when appropriate
      this.isWorkspaceDeleted = false;
    }
  }
}




isWorkspacePresent(workspaceId: number): boolean {
  return this.workspaces.some(workspace => workspace.id === workspaceId);
}

getSelectedWorkspace(): { id: number, name: string, description: string } | undefined {
  return this.workspaces.find(workspace => workspace.id === this.selectedWorkspaceId);
}



navigateToBoard(board: { workspaceId: number, title: string, background: string }) {
  this.router.navigate(['/board', board.workspaceId, board.title], {
    queryParams: { background: board.background },
  });
}
}
