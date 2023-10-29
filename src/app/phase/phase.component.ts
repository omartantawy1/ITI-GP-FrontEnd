import { Component,Input } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray,transferArrayItem} from '@angular/cdk/drag-drop';
import { PhaseInterface as Phase } from '../interfaces/phase-interface';
import { PhaseService } from '../services/phase.service';

@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.css']
})
export class PhaseComponent {

  @Input() phase! : Phase;
    
  
  showInput: boolean = false;
  newcard: string = '';
  newPhase: string = '';
  editIndex: number = -1;
  editableTitle: boolean = false;

  constructor(private phaseService:PhaseService){};

  enableTitleEdit() {
    
    this.editableTitle = true;
  }

  disableTitleEdit() {
    if (this.phase.title) {
      let phase = {
        'title':this.phase.title,
        'position': this.phase.position,
        'board_id': this.phase.board.id
      };
      this.phaseService.updatePhase(phase,this.phase.id).subscribe(
        (res:any) => (this.phase = res.data),
        (error)=>  console.log(error),
        );
    }
    this.editableTitle = false;

  }

  addcard() {
    this.showInput = true;
    this.newcard = ''; 
    this.editIndex = -1; 
  }


  savecard() {
    // if (this.newcard) {
    //   if (this.editIndex === -1) {
    //     this.phase.cards.push(this.newcard);
    //   } else {
    //     this.phase.cards[this.editIndex] = this.newcard;
    //     this.editIndex = -1; 
    //   }
    //   this.newcard = '';
    //   this.showInput = false;
    // }
  }

  cancelcard() {
    this.newcard = '';
    this.showInput = false;
    this.editIndex = -1; 
  }

  editcard(index: number) {
    // this.newcard = this.phase.cards[index];
    // this.editIndex = index;
  }

 

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
