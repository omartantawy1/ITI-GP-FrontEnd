import { Component, Input, Output,EventEmitter } from '@angular/core';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { BoardInterface } from '../interfaces/board-interface';
@Component({
  selector: 'app-second-nav',
  templateUrl: './second-nav.component.html',
  styleUrls: ['./second-nav.component.css']
})
export class SecondNavComponent {
  constructor(private router: Router) {}
  swatches = [
    "linear-gradient(to right, #ff9966, #ff5e62)",
    "linear-gradient(to right, #AA076B, #61045F)",
    "linear-gradient(to right, #348F50, #56B4D3)",
    "linear-gradient(to right, #2b5876, #4e4376)",
    "linear-gradient(to right, #ec008c, #fc6767)",
    "linear-gradient(to right, #536976, #292E49)",
    "linear-gradient(to right, #0F2027, #2C5364)",
    "linear-gradient(to right,#aa4b6b, #6b6b83,#3b8d99)",
    "linear-gradient(to right, #c31432, #240b36)",
    "linear-gradient(to right, #005AA7, #FFFDE4)",
    "linear-gradient(to right,#355C7D, #6C5B7B,#C06C84)",
    
    
  ];
  selectedColor: string = '';
  selectedBackgroundColor: string = '';
  popupVisible: boolean = false;
  workspaceListVisible: boolean = false;
  isFilterVisible: boolean = false;
  currentUser: any = {};

// constructor(private userService: UserService) {}

// ngOnInit(){
//   this.userService.getCurrentUser().subscribe(
//     res => this.currentUser = res,
//     err => console.log(err)
//   );
// }
  

  // Function to toggle the visibility
  toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
  }


  @Input() board!:BoardInterface;
  @Output() newItemEvent = new EventEmitter<string>();
  

  getContrastColor(background: string): string {
    const rgb = [parseInt(background.slice(1, 3), 16), parseInt(background.slice(3, 5), 16), parseInt(background.slice(5, 7), 16)];
    const luminance = 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2];
    return luminance > 128 ? 'black' : 'white';
  }

  
  selectColor(color: string) {
    this.selectedColor = color;
    this.selectedBackgroundColor = color;
    document.body.style.backgroundColor = color;
    this.togglePopup();
    this.newItemEvent.emit(this.selectedColor);
  }

  togglePopup() {
    this.popupVisible = !this.popupVisible;
  }



  toggleWorkspaceList() {
    this.workspaceListVisible = !this.workspaceListVisible;
  }

  // toggle: boolean = false;
  // showAccountMenu(){
  //   this.toggle = !this.toggle;
  // }

  navigateToPricing() {
    this.router.navigate(['/pricing']); // Replace 'pricing' with your actual route path
  }

}
