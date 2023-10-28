import { Component, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-second-nav',
  templateUrl: './second-nav.component.html',
  styleUrls: ['./second-nav.component.css']
})
export class SecondNavComponent {
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
  popupVisible: boolean = false;
  workspaceListVisible: boolean = false;


  isFilterVisible: boolean = false;

  // Function to toggle the visibility
  toggleFilter() {
    this.isFilterVisible = !this.isFilterVisible;
  }


  @Output() newItemEvent = new EventEmitter<string>();

  selectColor(color: string) {
    this.selectedColor = color;
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


}
