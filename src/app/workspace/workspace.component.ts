import { Component,ViewChild,ElementRef,AfterViewInit,OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PopupCreateWorkspaceComponent } from '../popup-create-workspace/popup-create-workspace.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Workspace } from '../interfaces/workspace';
import { WorkspaceService } from '../services/workspace.service';
import { BoardInterface as Board } from '../interfaces/board-interface';
import { BoardService } from '../services/board.service';
import { NavbarWithAccountService } from '../services/navbar-with-account.service';
@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent  {
  
  constructor(private navbarService:NavbarWithAccountService,private router: Router,private workspaceService:WorkspaceService,private boardService:BoardService) { }
  myWorkspaces: { id: number, name: string, description: string }[] = []; 
 /*  workspaces: { id: number, name: string ,description: string}[] = []; */
  workspaces:Array<Workspace> = [] ;
  newWorkspaceName = '';
  selectedWorkspaceId: number = 0;
  newWorkspaceNameInModal: string = '';
  newWorkspaceDescriptionInModal: string = ''; // Add description variable
  boards:Array<Board>=[];
  newBoardName = '';
  workspace!:Workspace;

  selectedColorIndex = -1;

  isCreateBoardSectionVisible = false;



  isCreateBoardVisible = false;


  ngOnInit(){
    this.navbarService.display();
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
          if(this.workspace.boards){
            this.boards = this.workspace.boards;
          }
          this.newWorkspaceName = this.workspace.title;
          this.newWorkspaceDescriptionInModal = this.workspace.description;
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
        this.workspaces.unshift(res.workspace);
        this.newWorkspaceNameInModal = '';
        this.newWorkspaceDescriptionInModal = '';
      },
      (error)=>{console.log(error)}
    );

   /*  console.log('Updated Workspaces:', this.workspaces);
    console.log('Boards:', this.boards);  Log the boards when a workspace is added*/
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
        'title': this.newBoardName,
        'background': this.backgroundColors[this.selectedColorIndex],
        'workspace_id':this.workspace.id
      };
      this.boardService.createBoard(newBoard).subscribe(
        (res:any)=>{

          this.boards.unshift(res.data);
          this.newBoardName = '';
          this.isCreateBoardVisible = false; // Log the boards when a new board is created
          this.selectedColorIndex = -1;
        },
        (error)=>{
          console.log(error);
        }
      );
    }
  }


/*   deleteBoard(board: Board) { */
    //const index = this.workspace.boards.findIndex(b => b.id === board.id /* && b.background === board.background */);
/*     if (index !== -1) {
      this.boards.splice(index, 1);
      console.log('Updated Boards:', this.boards);
    }
  }
 */
  
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

  confirmDeleteBoard(boardId:number) {
    if(boardId){
     /*  let board = this.workspace.boards.find(b => b.id === boardId ) */
      let index = this.boards.findIndex(b => b.id === boardId )
        this.boardService.deleteBoard(boardId).subscribe();
          this.boards.splice(index,1);
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
    return this.workspace.boards.filter(board => board.workspace_id === this.selectedWorkspaceId);
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
    console.log(this.newWorkspaceName);
    if (this.newWorkspaceName) {
      let workspace = {
        'title': this.newWorkspaceName,
        'description': this.newWorkspaceDescriptionInModal,
      }

      this.workspaceService.updateWorkspace(this.workspace.id,workspace).subscribe(
        (res:any)=>{
          console.log(res)
          this.workspace = res.data;
          this.isWorkspaceEditMode = false;
          this.workspaceService.SelectedWorkspace(res.data);
        },
        (error)=>{
          console.log(error);
        }
      );
        // Reset edit mode after saving
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
      this.workspaceService.deleteWorkspace(this.workspace.id).subscribe();
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



navigateToBoard(board: Board) {
  this.router.navigate(['/board', board.workspace_id, board.title], {
    /* queryParams: { background: board.background }, */
  });
}
}