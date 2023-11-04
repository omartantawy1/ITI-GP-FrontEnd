import { Component, Input , ViewChild, ElementRef} from '@angular/core';
import { CardInterface } from '../interfaces/card-interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

@Input() card!: CardInterface;
  showChecklist = false;
  checklistName: string = '';
  checklistid: number = 0;
  checklistItem: string = '';
  checklistItemid: number = 0;
  editingItemId: number | null = null;
  editingItemIds: { [checklistId: number]: number | null } = {};
  additem:boolean = false;
  checklistProgress: { [checklistId: number]: number } = {};
  

  checklistTitles: { id: number; title: string; items: { id:number, name: string; checked: boolean }[] }[] = [];

  isChecklistEmpty(): boolean {
    return this.checklistName.trim() === '';
  }

  toggleChecklist() {
    this.showChecklist = !this.showChecklist;
  }

  showChecklistTitles() {
    if (this.checklistName.trim() !== '') {
      const newItem = { id: this.checklistTitles.length, title: this.checklistName, items: [] };
      this.checklistTitles.push(newItem);
      this.checklistName = '';
    }
    this.toggleChecklist();
  }

  deleteChecklist(checklistId: number) {
    const index = this.checklistTitles.findIndex(item => item.id === checklistId);
    if (index !== -1) {
      this.checklistTitles.splice(index, 1);
    }
  }


  addItem(checklistid: number) {
    this.editingItemId = checklistid;
  }
  

  addItemToChecklist(checklistId: number) {
    const checklist = this.checklistTitles.find(item => item.id === checklistId);
    if (checklist && this.checklistItem.trim() !== '') {
      checklist.items.push({ id: checklist.items.length, name: this.checklistItem, checked: false });
      this.checklistItem = '';
      this.editingItemId = null;
  
      // Initialize the checklist progress to 0%
      this.checklistProgress[checklist.id] = 0;
  
      // Log the checklist and its items here
      console.log('Checklist:', checklist);
    }
  }

  updateChecklistProgress(checklistId: number) {
    const checklist = this.checklistTitles.find(item => item.id === checklistId);
    if (checklist) {
      const totalItems = checklist.items.length;
      const checkedItems = checklist.items.filter(item => item.checked).length;
      const progress = (checkedItems / totalItems) * 100;
      this.checklistProgress[checklist.id] = progress;
    }
  }


  deleteItem(checklist: { id: number; title: string; items: { id: number, name: string, checked: boolean }[] }, item: { id: number, name: string, checked: boolean }) {
    const checklistIndex = this.checklistTitles.findIndex(list => list.id === checklist.id);
    if (checklistIndex !== -1) {
      const itemIndex = checklist.items.findIndex(i => i === item);
      if (itemIndex !== -1) {
        checklist.items.splice(itemIndex, 1);
  
       
        const totalItems = checklist.items.length;
        const checkedItems = checklist.items.filter(item => item.checked).length;
        const progress = totalItems === 0 ? 0 : (checkedItems / totalItems) * 100;
        this.checklistProgress[checklist.id] = progress;
      }
    }
  }
  

  cancelAddItem() {
    this.checklistItem = '';
    this.editingItemId = null;
  }

  /*****    Labels Part   *** */






 

/**********     Dates *** */






  /**  Description Part  */

  description: string = ''; 
  editing: boolean = true; 

  editDescription() {
      this.editing = true;
  }

  saveDescription() {
      this.editing = false;
  }

  cancelDescription() {
      this.editing = false;
  }
  
  /***   Attachments Part */

  showDeleteIcon = false;
  uploadedFiles: Array<any> = [];

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = () => {
          this.uploadedFiles.push({
            name: file.name,
            type: this.getFileType(file.type),
            url: reader.result,
          });
        };

        reader.readAsDataURL(file);
      }
    }
  }

  removeFile(file: any) {
    const index = this.uploadedFiles.indexOf(file);
    if (index !== -1) {
      this.uploadedFiles.splice(index, 1);
    }
  }

  

  getFileType(type: string) {
    if (type.includes('image')) {
      return 'image';
    } else if (type.includes('pdf')) {
      return 'pdf';
    } else if (type.includes('msword') || type.includes('officedocument')) {
      return 'document';
    } else {
      return 'other';
    }
  }


  /******   Comments Part     ******/

  commentText: string = '';
  comments: string[] = [];
  isInputDisabled: boolean = false;
  editingCommentIndex: number | null = null;
  originalCommentText: string = '';
  editingCommentText: string = ''; // Variable to store the text of the comment being edited

  saveComment() {
    if (this.commentText.trim() !== '') {
      this.comments.push(this.commentText);
      this.commentText = '';
      this.isInputDisabled = false;
    }
  }

  clearComment() {
    this.commentText = '';
  }

  deleteComment(index: number) {
    this.comments.splice(index, 1);
  }

  saveEdit(index: number) {
    if (this.editingCommentText.trim() !== '') {
      this.comments[index] = this.editingCommentText;
      this.editingCommentIndex = null;
      this.editingCommentText = ''; 
    }
  }

  cancelEdit(index: number) {
    this.editingCommentIndex = null;
    this.editingCommentText = ''; 
  }

  enableEdit(index: number) {
    this.editingCommentIndex = index;
    this.editingCommentText = this.comments[index];
  }

}
