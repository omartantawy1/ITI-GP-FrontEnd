import { Component,Input } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray,transferArrayItem} from '@angular/cdk/drag-drop';
import { PhaseInterface as Phase } from '../interfaces/phase-interface';
import { PhaseService } from '../services/phase.service';
import { CardService } from '../services/card.service';
import { CardInterface as Card } from '../interfaces/card-interface';

@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.css']
})
export class PhaseComponent {

  @Input() phase! : Phase;
    
  
  newcard: string = '';
  newPhase: string = '';
  editIndex: number = -1;
  showInput: boolean = false;
  editCardTitle: boolean = false;
  editPhaseTitle: boolean = false;

  constructor(private phaseService: PhaseService,private cardService: CardService){};

  enableTitleEdit() {
    
    this.editPhaseTitle = true;
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
    this.editPhaseTitle = false;

  }

  addcard() {
    this.showInput = true;
    this.newcard = ''; 
  }


  saveCard() {
    if (this.newcard) {
      let card = {
        'title': this.newcard,
        'position': this.phase.cards!.length,
        'phase_id': this.phase.id
      };
        this.cardService.createCard(card).subscribe(
          (res:any) => (this.phase.cards!.push(res.data)),
          (error)=>  console.log(error),
          ()=>console.log('success')
          );
      }
      this.newcard = '';
      
  }

  cancelcard() {
    this.newcard = '';
    this.showInput = false;
  }

  enableCardTitleEdit(index: number) {
    this.newcard = this.phase.cards![index].title;
    this.editIndex = index;
  }

  updateCardTitle(index:number){
    if (this.newcard) {
      let card = {
        'title': this.newcard,
        'phase_id': this.phase.id
      };
        this.cardService.updateCard(card,this.phase.cards![index].id).subscribe(
          (res:any) => (this.phase.cards![index]= res.data),
          (error)=>  console.log(error),
          ()=>console.log('success')
          );
      }
      this.newcard = '';
      this.editIndex = -1;
  }

  

  onDrop(event: CdkDragDrop<any>) {
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
    console.log(event.container)
    console.log(event.previousContainer)
    console.log(event.currentIndex)
    console.log(event.previousIndex)
  }
}
