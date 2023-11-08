import { Component,ViewChild,ElementRef,AfterViewInit,OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PopupCreateWorkspaceComponent } from '../popup-create-workspace/popup-create-workspace.component';
@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent  {
  myWorkspaces: { id: number, name: string, description: string }[] = []; // Update to include description
  @Input() workspace!: { id:number,  name: string,description:string ,boards:Array<any>};
  newWorkspaceName = '';
  selectedWorkspaceId: number = 0;
  newWorkspaceNameInModal: string = '';
  newWorkspaceDescriptionInModal: string = ''; // Add description variable
  boards: { workspaceId: number, title: string,background:string}[] = [];
  newBoardName = '';

  selectedColorIndex = -1; 

  isCreateBoardSectionVisible = false;



  isCreateBoardVisible = false;
  @Output() newBoardInWorkspace = new EventEmitter<any>();
  updateboards(board:any){
    board.id = this.workspace.boards.length+1;
    board.color = 'black';
    this.workspace.boards.push(board);
    this.newBoardInWorkspace.emit(this.workspace);
  }
//   toggleCreateBoardSection() {
//     this.isCreateBoardVisible = !this.isCreateBoardVisible;
//   }

//   toggleSelectedColor(index: number) {
//     this.selectedColorIndex = this.selectedColorIndex === index ? -1 : index;
//   }

 

// // Board selectors options


  

  // addWorkspaceInModal() {
  //   if (this.newWorkspaceNameInModal) {
  //     const id = this.workspaces.length + 1;
  //     const newWorkspace = {
  //       id,
  //       name: this.newWorkspaceNameInModal,
  //       description: this.newWorkspaceDescriptionInModal, // Include description
  //     };
  //     this.workspaces.push(newWorkspace);
  //     this.myWorkspaces.push(newWorkspace);
  //     this.newWorkspaceNameInModal = '';
  //     this.newWorkspaceDescriptionInModal = ''; // Clear description field
  //   }
  // }

  


  // createWorkspace() {
  //   if (this.newWorkspaceName) {
  //     const id = this.workspaces.length + 1; // Generate a unique ID
  //     this.workspaces.push({ id, name: this.newWorkspaceName });
  //     this.myWorkspaces.push({ id, name: this.newWorkspaceName,description:this.newWorkspaceName }); // Add to "My Workspaces"
  //     this.newWorkspaceName = ''; // Clear the input field
  //   }
  // }
 

//   backgroundColors: string[] = [
//     'linear-gradient(to right, #ff9966, #ff5e62)',
//     'linear-gradient(to right, #AA076B, #61045F)',
//     'linear-gradient(to right, #348F50, #56B4D3)',
//     'linear-gradient(to right, #2b5876, #4e4376)',
//     'linear-gradient(to right,#355C7D, #6C5B7B,#C06C84)',
//     'linear-gradient(to right, #ec008c, #fc6767)',
//     'linear-gradient(to right, #0F2027, #2C5364)',
//   ];

//   // ... (other methods)

//   createBoard() {
//     if (this.newBoardName &&   this.selectedColorIndex >= 0) {
//       const newBoard = {
//         workspaceId: this.selectedWorkspaceId,
//         title: this.newBoardName,
//         background: this.backgroundColors[this.selectedColorIndex],
//       };
//       this.boards.push(newBoard);
//       this.newBoardName = '';
//       this.isCreateBoardVisible = false;
//     }
//   }



  
//   selectWorkspace(workspaceId: number) {
//     this.selectedWorkspaceId = workspaceId;
//   }

  // getSelectedWorkspaceName(): string {
  //   const selectedWorkspace = this.workspaces.find(workspace => workspace.id === this.selectedWorkspaceId);
  //   return selectedWorkspace ? selectedWorkspace.name : '';
  // }
  
//   getBoardsInSelectedWorkspace() {
//     return this.boards.filter(board => board.workspaceId === this.selectedWorkspaceId);
//   }
// workspaceName: string = this.workspace.name;

getInitials(workspaceName:string): string {
  return workspaceName.charAt(0).toUpperCase();
 }
updateUserImage(): void {}

}
