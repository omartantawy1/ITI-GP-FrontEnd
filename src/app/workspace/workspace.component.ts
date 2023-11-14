import { Component,ViewChild,ElementRef,AfterViewInit,OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PopupCreateWorkspaceComponent } from '../popup-create-workspace/popup-create-workspace.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Workspace } from '../interfaces/workspace';
import { WorkspaceService } from '../services/workspace.service';
import { BoardInterface as Board } from '../interfaces/board-interface';
@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent  {
  
  constructor(private router: Router,private workspaceService:WorkspaceService) { }
  myWorkspaces: { id: number, name: string, description: string }[] = []; 
 /*  workspaces: { id: number, name: string ,description: string}[] = []; */
  workspaces:Array<Workspace> = [] ;
  newWorkspaceName = '';
  selectedWorkspaceId: number = 0;
  newWorkspaceNameInModal: string = '';
  newWorkspaceDescriptionInModal: string = ''; // Add description variable
  boards: { workspaceId: number, title: string,background:string}[] = [];
  newBoardName = '';
  workspace!:Workspace;

  selectedColorIndex = -1;

  isCreateBoardSectionVisible = false;



  isCreateBoardVisible = false;


  ngOnInit(){

    this.workspace!;
    this.workspaceService.getAllWorkspaces().subscribe(
      (res:any)=>{
        this.workspaces = res.data;
      },
      (error)=>{console.log(error)}
    );
    setInterval(()=>{
      this.workspaceService.getWorkspace$.subscribe((workspace)=>{
        this.workspace = workspace; 
        console.log(workspace);
      }
      );
    },3000)
  }

  toggleCreateBoardSection() {
    this.isCreateBoardVisible = !this.isCreateBoardVisible;
  }

  toggleSelectedColor(index: number) {
    this.selectedColorIndex = this.selectedColorIndex === index ? -1 : index;
  }

 



  

addWorkspaceInModal() {
  if (this.newWorkspaceNameInModal) {
    let newWorkspace = {
      'title': this.newWorkspaceNameInModal,
      'description': this.newWorkspaceDescriptionInModal,
    };
    this.workspaceService.createWorkspace(newWorkspace).subscribe(
      (res:any)=>{
        this.workspaces.push(res.workspace);
        this.newWorkspaceNameInModal = '';
        this.newWorkspaceDescriptionInModal = '';
      },
      (error)=>{console.log(error)}
    );

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


  deleteBoard(board: Board) {
    const index = this.boards.findIndex(b => b.workspaceId === board.workspace_id && b.title === board.title /* && b.background === board.background */);
    if (index !== -1) {
      this.boards.splice(index, 1);
      console.log('Updated Boards:', this.boards);
    }
  }

  
 isDeleteConfirmationModalVisible = false;
  boardToDelete!: Board;

  openDeleteConfirmationModal(board:Board) {
    this.boardToDelete = board;
    this.isDeleteConfirmationModalVisible = true;
  }

  closeDeleteConfirmationModal() {
    this.isDeleteConfirmationModalVisible = false;
    this.boardToDelete!;
  }

  confirmDeleteBoard() {
    if (this.boardToDelete) {
      this.deleteBoard(this.boardToDelete);
      this.closeDeleteConfirmationModal();
    }
  }

  
  

  getSelectedWorkspaceName(): string {
    let selectedWorkspace = this.workspaces.find(workspace => workspace.id === this.selectedWorkspaceId);
    return selectedWorkspace ? selectedWorkspace.title : '';
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
      console.log('Selected Workspace Name:', selectedWorkspace.title);
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
        this.workspaces[index].title = this.newWorkspaceName;
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

openDeleteWorkspaceConfirmationModal(workspace: Workspace) {
  if (workspace) {
    this.isDeleteWorkspaceConfirmationModalVisible = true;

  }
}

closeDeleteWorkspaceConfirmationModal() {
  this.isDeleteWorkspaceConfirmationModalVisible = false;
}


isWorkspaceDeleted = false;

confirmDeleteWorkspace() {
  if (this.workspace) {
    const index = this.workspaces.findIndex(workspace => workspace.id === this.workspace.id);
 
      // Delete the workspace and its boards
      this.workspaces.splice(index, 1);
      console.log("workspace delted "+this.workspace);
      console.log("hereee delete")
      this.workspaceService.deleteWorkspace(this.workspace.id).subscribe(
        (res:any)=>{
          console.log("hereee delete")
          console.log(res);
        },
        (error)=>{console.log(error);}
      );
      this.workspaceService.SelectedWorkspace(null);

      // Set the flag to true when the workspace is deleted
      this.isWorkspaceDeleted = true;

      // Update myWorkspaces
      /* this.myWorkspaces = this.workspaces.slice();  */// Create a copy of workspaces

      // Log the updated workspaces and boards
   

    
      this.isDeleteWorkspaceConfirmationModalVisible = false;

      // Reset the flag when appropriate
      this.isWorkspaceDeleted = false;
    
  }
}




isWorkspacePresent(workspaceId: number): boolean {
  return this.workspaces.some(workspace => workspace.id === workspaceId);
}

getSelectedWorkspace(){
  return this.workspaces.find(workspace => workspace.id === this.selectedWorkspaceId);
}



navigateToBoard(board: { workspaceId: number, title: string, background: string }) {
  this.router.navigate(['/board', board.workspaceId, board.title], {
    queryParams: { background: board.background },
  });
}
}