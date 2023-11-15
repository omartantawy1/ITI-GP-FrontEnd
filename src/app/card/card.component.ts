import { Component, Input,Output ,EventEmitter} from '@angular/core';
import { CardInterface } from '../interfaces/card-interface';
import { CommentService } from '../services/comment.service';
import { CommentInterface as Comment } from '../interfaces/comment-interface';
import { UserService } from '../services/user.service';
import { UserInterface as User } from '../interfaces/user-interface';
import { CardService } from '../services/card.service';
import { CategoryService } from '../services/category.service';
import { CategoryInterface as Category } from '../interfaces/category-interface';
import { error } from 'jquery';
import { TaskService } from '../services/task.service';
import { GroupService } from '../services/group.service';
import { AttachmentService } from '../services/attachment.service';
import { InvitationService } from '../services/invitation.service';

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
  additem:boolean = false;
  checklistProgress: { [checklistId: number]: number } = {};

  checklistTitles: { id: number; name: string; items: { id: number, name: string; checked: boolean }[] }[] = [];
  DataCast: any = {};
  showInviteMember = false;
  memberEmail: string = '';
  
  categories: Array<Category> = [];
  
/*   comments: Array<Comment> = []; */
  

  constructor(private commentService:CommentService,
    private userService:UserService,
    private cardService:CardService,
    private categoryService:CategoryService,
    private groupService: GroupService,
    private taskService: TaskService,
    private attachmentService: AttachmentService,
    private invitationService: InvitationService){}


  /* initalize all thing on card */
  ngOnInit(){
    console.log(this.card);
    this.checklistTitles = this.card.groups? this.card.groups:[];
    // this.uploadedFiles = this.card.attachments? this.card.attachments:[];
    
  
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


  addItem(checklistid: number) {
    this.editingItemId = checklistid;
  }


  addItemToChecklist(checklistId: number) {

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
    this.DataCast = {};
  }

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
      this.DataCast = {};

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
      this.DataCast = {};
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

  /******Members *********/

  isMemberEmpty(): boolean {
    return this.memberEmail.trim() === '';
  }

  toggleInviteMember() {
    const memberInput = document.getElementById('member') as HTMLInputElement | null;
    if (memberInput) {
      memberInput.value = '';
    }
    this.memberRes = '';
    this.showInviteMember = !this.showInviteMember;
  }

  memberRes = '';
  inviteMember(){
    if (this.memberEmail.trim() !== '' && this.currentUser.email !== this.memberEmail) {
      
      this.DataCast.email = this.memberEmail;
      this.DataCast.invitation_on = 'card';
      this.DataCast.invitation_on_id = this.card.id;
      this.invitationService.sendInvitaion(this.DataCast).subscribe(
        (response: any) => {
          this.memberRes = response.message;
          // this.checklistid = response.data.id;
          // const newItem = { id: this.checklistid, name: this.checklistName, items: [] };
          // this.checklistTitles.push(newItem);
          // this.checklistName = '';
          console.log("success");
        },
        (error) => {
          this.memberRes = error.error.message;
          console.error(error);
        }
      );
      this.DataCast = {}
    } else if (this.currentUser.email === this.memberEmail){
      this.memberRes = "You can't invite yourself";
    }
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

    toggleCategories() {
        this.showCategories = !this.showCategories;
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



/**********     Dates *** */






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

  showDeleteIcon = false;
  // uploadedFiles: Array<any> = [];
  

  onFileSelected(event: any) {

    // let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    // const file: any = inputEl.files ? inputEl.files.item(0) : 0;


    let file = event.target.files[0]
    const formData = new FormData();

    formData.append('attachment', file);
    formData.append('user_id', this.currentUser.id.toString());
    formData.append('card_id', this.card.id.toString());
    

    this.attachmentService.createAttachment(formData).subscribe(
      (res: any) => {
        console.log("uploaded");
        this.card.attachments.unshift(res.data);

        // const reader = new FileReader();
      //   reader.readAsDataURL(file);
      // reader.onload = () => {
      //   this.uploadedFiles.push({
      //     id: file.id,
      //     name: file.name,
      //     type: this.getFileType(file.type),
      //     url: reader.result as string,
        },
        (err) => console.log(err)
      );

        // console.log(this.uploadedFiles); // Move the log statement here
      // };
      
  }

  removeFile(index: number) {
    this.attachmentService.deleteAttachment(this.card.attachments[index]).subscribe(
      (response: any) => {
        console.log('deleted');
        this.card.attachments.splice(index, 1);
    },
    (error) => {
      // Registration failed, handle the error here
      console.error(error);
    }
    );
  }

  // getFileType(type: string) {
  //   if (type.includes('image')) {
  //     return 'image';
  //   } else if (type.includes('pdf')) {
  //     return 'pdf';
  //   } else if (type.includes('msword') || type.includes('officedocument')) {
  //     return 'document';
  //   } else {
  //     return 'other';
  //   }
  // }


  downloadFile(file: any) {


    this.attachmentService.downloadAttachment(file).subscribe(
      (data) => {
        const newblob = new Blob([data], {type: file.type});

         var downloadURL = window.URL.createObjectURL(newblob);
         var link = document.createElement('a');
         link.href = downloadURL;
         link.target = '_blank';
         link.download = file.name;
         link.click();
         console.log('downloaded');
         
      }
    );
 
  }
  
  img(file: any) {


    this.attachmentService.downloadAttachment(file).subscribe(
      (data) => {
        return data;
         
      }
    );
 
  }
 
  toggleEditMode(file: any) {
    file.editMode = !file.editMode;
  
  }


  saveEditedName(file: any) {
    file.name = file.newName; // Update the name with the new name
    file.editMode = false; // Exit edit mode

    this.DataCast.name = file.name;
    this.DataCast.id = file.id;
    this.attachmentService.updateAttachment(this.DataCast).subscribe(
      (response: any) => {
        console.log('edited', response);

    },
    (error) => {
      // Registration failed, handle the error here
      console.error(error);
    }
    );

    this.DataCast = {};
  }
  cancelEditFile(file: any) {
  
    if (!file.newName || file.newName.trim() === '') {
      file.newName = file.name;
    }
    file.editMode = false;
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
