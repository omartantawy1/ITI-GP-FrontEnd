import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {


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



}
