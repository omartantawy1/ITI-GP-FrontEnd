import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { CardInterface } from '../interfaces/card-interface';
import { CardService } from '../services/card.service';
import { GroupService } from '../services/group.service';

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
  additem: boolean = false;
  checklistProgress: { [checklistId: number]: number } = {};


  checklistTitles: { id: number; name: string; items: { id: number, name: string; checked: boolean }[] }[] = [];
  DataCast: any = {};

  constructor(private CardService: CardService, private GroupService: GroupService) {
    CardService.getCard(2).subscribe(
      (response: any) => {

        this.checklistTitles = response.data.groups;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  isChecklistEmpty(): boolean {
    return this.checklistName.trim() === '';
  }

  toggleChecklist() {
    this.showChecklist = !this.showChecklist;
  }

  showChecklistTitles() {
    if (this.checklistName.trim() !== '') {
      const newItem = { id: this.checklistTitles.length, name: this.checklistName, items: [] };
      this.checklistTitles.push(newItem);
      this.DataCast.name = this.checklistName;
      this.DataCast.card_id = this.card.id;
      this.GroupService.createGroup(this.DataCast);
      this.checklistName = '';
    }
    this.toggleChecklist();
  }

  editingChecklist: any;

  editChecklistTitle(checklist: any) {
    this.editingChecklist = checklist;
  }

  saveChecklistTitle() {
    // this.groupDataCast.id = this.editingChecklist.id;
    // this.groupDataCast.name = this.editingChecklist.name;
    // this.groupDataCast.card_id = this.editingChecklist.card.id;
    this.GroupService.updateGroup(this.editingChecklist).subscribe(
      (response: any) => {

        console.log("success");
      },
      (error) => {
        console.error(error);
      }
    );
    this.editingChecklist = null;
  }

  cancelEditChecklistTitle() {
    this.editingChecklist = null;
  }

  deleteChecklist(checklist: { id: number, name: string, items: { id: number, name: string, checked: boolean }[] }) {

    const index = this.checklistTitles.findIndex(item => item.id === checklist.id);
    if (index !== -1) {
      this.checklistTitles.splice(index, 1);
      if (this.editingItemId === checklist.id) {
        this.editingItemId = null;
      }
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


  deleteItem(checklist: { id: number; name: string; items: { id: number, name: string, checked: boolean }[] }, item: { id: number, name: string, checked: boolean }) {
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

  editItemName(checklistId: number, item: { id: number, name: string, checked: boolean }) {
    this.editingItemIds[checklistId] = item.id;
  }

  saveItemName(checklist: { id: number, name: string, items: { id: number, name: string, checked: boolean }[] }, item: { id: number, name: string, checked: boolean }) {

    item.name = item.name.trim();
    if (item.name === '') {

    } else {

      this.editingItemIds[checklist.id] = null;
    }
  }

  cancelEditItemName(checklistId: number) {
    const checklist = this.checklistTitles.find(item => item.id === checklistId);

    if (checklist) {
      const item = checklist.items.find(i => i.id === this.editingItemIds[checklistId]);

      if (item) {
        const trimmedName = item.name.trim();
        if (trimmedName === '') {
          console.log("Item name cannot be empty.");
          return;
        }
      }
    }

    this.editingItemIds[checklistId] = null;
  }

  /*****    Categories   *** */

  showcreateCategories = false;
  showCategories = false;
  selectedColor: number | null = null;
  newCategoryTitle: string = '';
  selectedCategoryColor: string = '';
  categories: { title: string, color: string }[] = [];
  selectedCategories: { title: string, color: string }[] = []
  editCategoryIndex: number | null = null;


  togglecreateCategories() {
    this.showcreateCategories = !this.showcreateCategories;
  }

  toggleCategories() {
    this.showCategories = !this.showCategories;
  }

  selectColor(colorId: number) {
    this.selectedColor = colorId;
    this.selectedCategoryColor = this.colors.find(color => color.id === colorId)?.color || '';
  }

  createCategory() {
    if (this.newCategoryTitle && this.selectedCategoryColor || this.selectedCategoryColor) {
      this.categories.push({
        title: this.newCategoryTitle,
        color: this.selectedCategoryColor
      });

      // Clear the inputs
      this.newCategoryTitle = '';
      this.selectedCategoryColor = '';
      this.selectedColor = null;
      this.toggleCategories();
    }
  }

  // editCategory(index: number) {
  //   this.editCategoryIndex = index;
  //   this.newCategoryTitle = this.categories[index].title;
  //   this.selectedCategoryColor = this.categories[index].color;
  // }

  deleteCategory(index: number) {
    if (this.editCategoryIndex === index) {
      // If the category being edited is deleted, reset the edit mode
      this.editCategoryIndex = null;
    }

    const deletedCategory = this.categories[index];
    this.categories.splice(index, 1);

    // Remove the deleted category from selectedCategories if it exists there
    const selectedCategoryIndex = this.selectedCategories.findIndex((c) => c === deletedCategory);
    if (selectedCategoryIndex !== -1) {
      this.selectedCategories.splice(selectedCategoryIndex, 1);
    }
  }




  toggleCategorySelection(category: { title: string, color: string }) {
    const index = this.selectedCategories.findIndex((c) => c === category);

    if (index === -1) {
      this.selectedCategories.push(category);
    } else {

      this.selectedCategories.splice(index, 1);
    }
  }
  isSelectedCategory(category: { title: string, color: string }): boolean {
    return this.selectedCategories.some((c) => c === category);
  }


  colors = [
    { id: 1, color: '#1A2980' },
    { id: 2, color: '#61045F' },
    { id: 3, color: '#FF512F' },
    { id: 4, color: '#DD2476' },
    { id: 5, color: '#2ECC71' },
    { id: 6, color: '#F1C40F' },
    { id: 7, color: '#314755' },
    { id: 8, color: '#003973' },
    { id: 9, color: '#7AA1D2' },
    { id: 10, color: '#3CA55C' },
    { id: 11, color: '#56B4D3' },
    { id: 12, color: '#9733EE' },
    { id: 13, color: '#00CDAC' },
    { id: 14, color: '#EA384D' },
    { id: 15, color: '#16A085' },
    { id: 16, color: '#603813' },
    { id: 17, color: '#e52d27' },
    { id: 18, color: '#26a0da' },
    { id: 19, color: '#e65c00' },
    { id: 20, color: '#2B32B2' },

  ];


















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
