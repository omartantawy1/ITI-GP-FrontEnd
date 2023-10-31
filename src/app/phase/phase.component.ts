import { Component,Input } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray,transferArrayItem} from '@angular/cdk/drag-drop';
import { PhaseInterface as Phase } from '../interfaces/phase-interface';
import { PhaseService } from '../services/phase.service';
import { CardService } from '../services/card.service';
import { CardInterface as Card } from '../interfaces/card-interface';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.css']
})
export class PhaseComponent {

  @Input() phase! : Phase;
  @Input() phases : Array<Phase>= [];
    
  
  newcard: string = '';
  newPhase: string = '';
  editIndex: number = -1;
  showInput: boolean = false;
  editCardTitle: boolean = false;
  editPhaseTitle: boolean = false;

  constructor(private phaseService: PhaseService,private cardService: CardService){};

  
  ngOnInit(){
    this.phaseService.getAllPhases().subscribe(
      (data:any) => (this.phases = data.data),
      (error)=>  console.log(error),
    );

    }
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
      this.showInput = false;
      
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
      let current = event.container.id.split("-");
      let phaseNext = this.phases.find(p=>p.position== +current[current.length-1]-1);
      if(phaseNext){
        event.container.data.forEach((element:Card)=>{
          let index = event.container.data.indexOf(element);
          let card = {
            'title': element.title,
            'position': index,
            'phase_id': phaseNext!.id
          };
          this.cardService.updateCard(card,element.id).subscribe(
            (res:any) => {/* 
              event.container.data[index].position = res.data.position;
              event.container.data[index].phase_id=res.data.phase.id */},
            (error)=>  console.log(error)
            );
          });
        }
        
      event.previousContainer.data.forEach((element:Card)=>{
        let index = event.previousContainer.data.indexOf(element);
        let card = {
          'title': element.title,
          'position': index,
          'phase_id': element.phase_id
        };
        this.cardService.updateCard(card,element.id).subscribe(
          (res:any) => {/* 
            event.previousContainer.data[index].position = res.data.position;
            event.previousContainer.data[index].phase_id=res.data.phase.id */},
          (error)=>  console.log(error)
          );
      });

      /*let thisCard = event.container.data[event.currentIndex];

      if(thisCard&&phaseNext&&phaseNext.cards){

        let newPositionCardsCurrentPhase = event.container.data.filter((card:Card)=>card.position! >= event.currentIndex && card.id!=thisCard.id);
        let newPositionCardsPreiousPhase = event.previousContainer.data.filter((card:Card)=>(card.position! >=event.previousIndex));

        if(newPositionCardsCurrentPhase||newPositionCardsPreiousPhase){
          this.rankingCard(newPositionCardsCurrentPhase,'+');
          this.rankingCard(newPositionCardsPreiousPhase,'-');       
        }
        let card = {
          'title': thisCard.title,
          'position': event.currentIndex,
          'phase_id': phaseNext.id
        };
          this.cardService.updateCard(card,thisCard.id).subscribe(
            (res:any) => {event.container.data[event.currentIndex] = res.data; console.log(event.container.data)},
            (error)=>  console.log(error)
            );
        
      }*/
    } 
  } 


  /* rankingCard(cards:Array<Card>,assign:string){
        cards.forEach((element:Card)=>{
          let card = {
            'title': element.title,
            'position': assign === '+'?++element.position!:--element.position!,
            'phase_id': element.phase_id
          };
          this.cardService.updateCard(card,element.id).subscribe(
            (res:any) => (element = res.data),
            (error)=>  console.log(error)
            );
        });

  } */
}
