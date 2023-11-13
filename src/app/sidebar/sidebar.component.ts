import { Component , Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Input() opened:boolean = true;
  @Output() closeSide = new EventEmitter<boolean>();

  close(){
    this.closeSide.emit(false);
  }
  
  
}
