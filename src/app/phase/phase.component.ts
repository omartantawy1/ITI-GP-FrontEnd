import { Component,Input,Output,EventEmitter } from '@angular/core';
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

  @Input() phase! : any|Phase;
  @Input() phases : Array<Phase>= [];

  @Output() unSave = new EventEmitter<boolean>();
  @Output() cards = new EventEmitter<Array<Card>>();
  @Output() delPhase = new EventEmitter<number>();
  
  isUnSave: boolean = false;
  allMoves: Array<Card> = [];
  
  newcard: string = '';
  newPhase: string = '';
  editIndex: number = -1;
  showInput: boolean = false;
  editCardTitle: boolean = false;
  editPhaseTitle: boolean = false;
  isThreeDotsVisible: boolean = false;

  constructor(private phaseService: PhaseService,private cardService: CardService){};
  
  ngOnInit(){
    this.phaseService.getAllPhases().subscribe(
      (data:any) => {
        this.phases = data.data;
      },
      (error)=>  console.log(error),
    );

    }
  

    toggleThreeDots(){
      this.isThreeDotsVisible = !this.isThreeDotsVisible;
    }

    /* phase functions*/
    deletePhase(id:number){
    this.isThreeDotsVisible = false;
     this.delPhase.emit(id);
     this.phase = null;
    }



    isCardOpen:boolean=true;
    card!:Card;

    openCard(card:Card){
     this.isCardOpen=false;
     this.card=card;
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

  
  
 async onDrop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.rankingCardCurrent(event.container.data,null,event);
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
          
           this.rankingCardCurrent(event.container.data,phaseNext.id,event);
           
           this.rankingCardCurrent(event.previousContainer.data,null,event);
          }
        } 
        this.unSave.emit(true);
        
    } 
      
    rankingCardCurrent(cards: Array<Card>, phase_id: number|null, event: CdkDragDrop<any>) {
      cards.forEach( element => {
        const index = cards.indexOf(element);
        element.position = index;
        element.phase_id = phase_id?phase_id:element.phase_id;
        if(this.allMoves.length>0){
          let indexMove = this.allMoves.indexOf(element);
          this.allMoves.includes(element)?this.allMoves[indexMove]=element:this.allMoves.push(element);
        }else {
          this.allMoves.push(element);
        }
      });
      this.cards.emit(this.allMoves); 
    }

  
}
