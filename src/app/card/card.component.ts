
import { Component, Input , ViewChild, ElementRef,Output ,EventEmitter} from '@angular/core';
import { CardInterface } from '../interfaces/card-interface';
import { HttpClient } from '@angular/common/http'; 

import { CommentService } from '../services/comment.service';
import { CommentInterface as Comment } from '../interfaces/comment-interface';
import { UserService } from '../services/user.service';
import { UserInterface as User } from '../interfaces/user-interface';
import { CardService } from '../services/card.service';
import { CategoryService } from '../services/category.service';
import { CategoryInterface as Category } from '../interfaces/category-interface';
import { error } from 'jquery';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() card!: CardInterface;
  @Output() idDeleteCategory = new EventEmitter<number>();
  currentUser!:User;
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
  

  categories: Array<Category> = [];
  
/*   comments: Array<Comment> = []; */
  

  checklistTitles: { id: number; title: string; items: { id:number, name: string; checked: boolean }[] }[] = [];


  constructor(private groupService: GroupService, private taskService: TaskService,private commentService:CommentService,
    private userService:UserService,
    private cardService:CardService,
    private categoryService:CategoryService){}


  /* initalize all thing on card */
  ngOnInit(){
    console.log(this.card);
        this.checklistTitles = this.card.groups? this.card.groups:[];
  
    this.userService.getCurrentUser().subscribe(
      (res:any) => {
        this.currentUser = res;
      }
    );
    if(this.card.description!=""&&this.card.description){
      this.editing = false;
    }
    this.categoryService.getAllCategories().subscribe(
      (res:any)=>{
        this.categories = res.data;
      },
      (error)=>(console.log(error))
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

      
      this.DataCast.name = this.checklistName;
      this.DataCast.card_id = this.card.id;
      this.groupService.createGroup(this.DataCast).subscribe(
        (response: any) => {
          this.checklistid = response.data.id;
          const newItem = { id: this.checklistid, name: this.checklistName, items: [] };
          this.checklistTitles.push(newItem);
          this.checklistName = '';
          console.log("success");
        },
        (error) => {
          console.error(error);
        }
      );
      this.DataCast = {}
    }
    this.toggleChecklist();
  }


  editingChecklist: any;

  editChecklistTitle(checklist: any) {
    this.editingChecklist = checklist;
  }

  saveChecklistTitle() {
    this.groupService.updateGroup(this.editingChecklist).subscribe(
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

    this.groupService.deleteGroup(checklist).subscribe(
      (response: any) => {

        console.log("deleted");
      },
      (error) => {
        console.error(error);
      }
    );

    const index = this.checklistTitles.findIndex(item => item.id === checklist.id);
    if (index !== -1) {
      this.checklistTitles.splice(index, 1);
      if (this.editingItemId === checklist.id) {
        this.editingItemId = null;
      }

    }
  }

  editingChecklist: any; 
  originalTitle: string = '';

editChecklistTitle(checklist: any) {
  this.editingChecklist = checklist;
  this.originalTitle = checklist.title; // Save the original title
}

saveChecklistEditTitle() {
  if (this.editingChecklist.title.trim() !== '') {
    console.log('Edited checklist title:', this.editingChecklist.title);
  }
  this.editingChecklist = null;
}

  cancelEditChecklistTitle() {
    if (this.editingChecklist.title.trim() === '') {
      this.editingChecklist.title = this.originalTitle; 

    }
    this.editingChecklist = null;
  }


  addItem(checklistid: number) {
    this.editingItemId = checklistid;
   
  }


  addItemToChecklist(checklistId: number) {
/*
    const checklist = this.checklistTitles.find(item => item.id === checklistId);
    if (checklist && this.checklistItem.trim() !== '') {
      checklist.items.push({ id: checklist.items.length, name: this.checklistItem, checked: false });
      this.checklistItem = '';
      this.editingItemId = null;
  
      this.checklistProgress[checklist.id] = 0;
  
      
      console.log('Checklist:', checklist);
    }
  }
  */

    this.DataCast.name = this.checklistItem;
    this.DataCast.is_done = 0;
    this.DataCast.group_id = checklistId;
    this.taskService.createTask(this.DataCast).subscribe(
      (response: any) => {
        console.log("success");
        const checklist = this.checklistTitles.find(item => item.id === checklistId);
        if (checklist && this.checklistItem.trim() !== '') {
         checklist.items.push({ id: response.data.id, name: this.checklistItem, checked: false });
         this.checklistItem = '';
         this.editingItemId = null;

         // Initialize the checklist progress to 0%
         this.checklistProgress[checklist.id] = 0;

         // Log the checklist and its items here
         console.log('Checklist:', checklist);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  

  //   const checklist = this.checklistTitles.find(item => item.id === checklistId);
  //   if (checklist && this.checklistItem.trim() !== '') {
  //     checklist.items.push({ id: checklist.items.length, name: this.checklistItem, checked: false });
  //     this.checklistItem = '';
  //     this.editingItemId = null;

  //     // Initialize the checklist progress to 0%
  //     this.checklistProgress[checklist.id] = 0;

  //     // Log the checklist and its items here
  //     console.log('Checklist:', checklist);
  //   }
  // }

  updateChecklistProgress(checklistId: number, item: { id: number, name: string, checked: boolean }) {

    this.DataCast.id = item.id;
      this.DataCast.name = item.name;
      this.DataCast.is_done = item.checked;
      this.DataCast.group_id = checklistId;
      this.taskService.updateTask(this.DataCast).subscribe(
        (response: any) => {

          console.log("success");
        },
        (error) => {
          console.error(error);
        }
      );


    const checklist = this.checklistTitles.find(item => item.id === checklistId);
    if (checklist) {
      const totalItems = checklist.items.length;
      const checkedItems = checklist.items.filter(item => item.checked).length;
      const progress = (checkedItems / totalItems) * 100;
      this.checklistProgress[checklist.id] = progress;
    }
  }


  deleteItem(checklist: { id: number; name: string; items: { id: number, name: string, checked: boolean }[] }, item: { id: number, name: string, checked: boolean }) {
    
    this.taskService.deleteTask(item).subscribe(
      (response: any) => {

        console.log("deleted");
      },
      (error) => {
        console.error(error);
      }
    );

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
  
  saveItemName(checklist: { id: number, title: string, items: { id: number, name: string, checked: boolean }[] }, item: { id: number, name: string, checked: boolean }) {
    
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

  editItemName(checklistId: number, item: { id: number, name: string, checked: boolean }) {
    this.editingItemIds[checklistId] = item.id;
  }

  saveItemName(checklist: { id: number, name: string, items: { id: number, name: string, checked: boolean }[] }, item: { id: number, name: string, checked: boolean }) {

    item.name = item.name.trim();
    if (item.name === '') {

    } else {
      this.DataCast.id = item.id;
      this.DataCast.name = item.name;
      this.DataCast.is_done = item.checked;
      this.DataCast.group_id = checklist.id;
      this.taskService.updateTask(this.DataCast).subscribe(
        (response: any) => {
          this.editingItemIds[checklist.id] = null;
          console.log("success");
        },
        (error) => {
          console.error(error);
        }
      );
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
  /* 
  this.categories
  
  selected = this.card.categories
  
  
  */

  showcreateCategories = false;
  showCategories = false;
  selectedColor: number | null = null;
  newCategoryTitle: string = '';
  selectedCategoryColor:string = '';
  selectedCategories: Array<Category>=[];
  editCategoryIndex: number | null = null;


  togglecreateCategories() {
    this.showcreateCategories = !this.showcreateCategories;
  }


    selectColor(indexColor: number) {
      this.selectedColor = this.colors[indexColor].id;
      this.selectedCategoryColor = this.colors[indexColor].color
    }

    createCategory() {
     if ((this.newCategoryTitle && this.selectedCategoryColor) || this.newCategoryTitle) {
        let category = {
          'name': this.newCategoryTitle,
          'color': this.selectedCategoryColor!=''?this.selectedCategoryColor:'blue',
          'card_id': this.card.id
        }
        console.log(category);
        this.categoryService.createCategory(category).subscribe(
          (res:any)=>{
            this.categories.push(res.data);
            this.card.categories.push(res.data);
            this.newCategoryTitle = '';
            this.selectedCategoryColor = '';
            this.selectedColor = null;
            this.togglecreateCategories();
          },
          (error)=>{console.log(error);}
        );
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

    this.categoryService.deleteCategory(this.categories[index].id).subscribe(
      (res:any)=>{
       let indexCardCategory = this.card.categories.findIndex(c=>c.id == this.categories[index].id);
       if(index){
        this.card.categories.splice(indexCardCategory,1);
       }
        this.idDeleteCategory.emit(this.categories[index].id);
        this.categories.splice(index, 1); 
      }
      );
      
/*       const deletedCategory = this.categories[index];

    // Remove the deleted category from selectedCategories if it exists there
    const selectedCategoryIndex = this.selectedCategories.findIndex((c) => c === deletedCategory);
    if (selectedCategoryIndex !== -1) {
      this.selectedCategories.splice(selectedCategoryIndex, 1);
    } */
  }




  toggleCategorySelection(index:number) {
    let isHasIndex =  this.card.categories.findIndex(c=>c.id == this.categories[index].id);
    if (!isHasIndex) {
      this.card.categories.push(this.categories[index]);
     /*  this.cardService.updateCard(this.card,this.card.id).subscribe(
        (res:any)=>{
          this.selectedCategories = res.data.categories; 
        }
      ); */
    } else {

      this.card.categories.splice(isHasIndex, 1);
      /* this.cardService.updateCard(this.card,this.card.id).subscribe(
        (res:any)=>{
          this.selectedCategories.splice(index, 1); 
        }
      ); */
    } 

  }
  
  isSelectedCategory(category:Category): boolean {
    return this.card.categories.includes(category);
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








  /**  Description Part  */

  description: string = '';
  editing: boolean = true;

  editDescription() {

    this.description = this.card.description??""

    this.editing = true;
  }

  saveDescription() {

    this.card.description = this.description;
    this.cardService.updateCard(this.card,this.card.id).subscribe(
      (res:any)=>{
        this.card.description = res.data.description;
        this.editing = false;
      },
      (error)=>{console.log(error)}
    );
  }

  cancelDescription() {
      this.description = this.card.description??"";
      this.editing = false;

  }

  /***   Attachments Part */

  uploadedFiles: Array<any> = [];

  constructor(private http: HttpClient) {}

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
            editMode: false // Add an editMode property to track editing
          });
        };

        reader.readAsDataURL(file);
      }
    }
  }

  removeFile(index: number) {
    this.uploadedFiles.splice(index, 1);
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


  downloadFile(url: string, name: string) {
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

 
  toggleEditMode(file: any) {
    file.editMode = !file.editMode;
  
  }


  saveEditedName(file: any) {
    file.name = file.newName; // Update the name with the new name
    file.editMode = false; // Exit edit mode
  }
  cancelEditFile(file: any) {
  
    if (!file.newName || file.newName.trim() === '') {
      file.newName = file.name;
    }
    file.editMode = false;
  }


  uploadFiles() {
    // Here, you can send the uploaded files to the backend using HTTP requests.
    // You can use this.http.post or any other suitable method to send the files.
    // Replace the URL with the actual endpoint where you want to handle file uploads.
    this.http.post('your-backend-upload-url', this.uploadedFiles).subscribe((response) => {
      // Handle the response from the backend, if needed.
    });
  }



  /******   Comments Part     ******/

  commentText: string = '';
  isInputDisabled: boolean = false;
  editingCommentIndex: number | null = null;
  originalCommentText: string = '';
  editingCommentText: string = ''; // Variable to store the text of the comment being edited

  saveComment() {
    if (this.commentText.trim() !== '') {
      let comment = {
        'content': this.commentText,
        'user_id': this.currentUser.id,
        'card_id':this.card.id,

      }
      this.commentService.createComment(comment).subscribe(
        (res:any)=>{
          this.card.comments.unshift(res.data);
          this.commentText = '';
          this.isInputDisabled = false;
        },
        (error)=>{console.log(error);}
      );
    }
  }

  clearComment() {
    this.commentText = '';
  }

  deleteComment(index: number) {
    this.commentService.deleteComment(this.card.comments[index].id).subscribe(
      (res:any)=>{
        this.card.comments.splice(index, 1);
      },
      (error)=>{
        console.log(error);
      }
    );
    
    
  }

  saveEdit(index: number) {
    if (this.editingCommentText.trim() !== '') {
      this.card.comments[index].content = this.editingCommentText;
      this.commentService.updateComment(this.card.comments[index],this.card.comments[index].id).subscribe(
        (res:any)=>{
          this.card.comments[index].content = res.data.content;
          this.editingCommentIndex = null;
          this.editingCommentText = ''; 
        },
        (error)=>{
          console.log(error);
        }
        
      );
    }
      
  }

  cancelEdit(index: number) {
    this.card.comments[index].content = this.card.comments[index].content; 
    this.editingCommentIndex = null;
    this.editingCommentText = '';
  }

  enableEdit(index: number) {
    this.editingCommentIndex = index;
    this.editingCommentText = this.card.comments[index].content;
  }

}
