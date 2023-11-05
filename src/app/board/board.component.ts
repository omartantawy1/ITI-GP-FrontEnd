import { Component,Input,Output } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { PhaseService } from '../services/phase.service';
import { PhaseInterface as Phase } from '../interfaces/phase-interface';
import { CardInterface as Card } from '../interfaces/card-interface';
import { CardService } from '../services/card.service';
import { count } from 'rxjs';
import { error } from 'jquery';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],

})
export class BoardComponent {

  backgroundcolor!: any;
  phases:Array<Phase>=[];
  showAddphaseButton: boolean = true;
  buttonText: string = 'Add phase'; 
  showInput:boolean = false;
  newPhase:string = '';
  
  buttonSaveText: string = 'Save'; 
  showButton:boolean = false;
  allMoves:Array<Card> = [];

  constructor(private phaseService: PhaseService,private cardService: CardService){}; 

  toggleBtnSave(flag:boolean){
    this.showButton = flag;
  }

  setAllMoves(cards: Array<Card>){
    this.allMoves = cards;
  }
 

  saveBtn(){ 
    this.buttonSaveText = "Loading..";
    console.log(this.allMoves);
    
   this.allMoves.forEach(element=>{
      this.cardService.updateCard(element, element.id).subscribe(
        (res:any)=>{
          console.log(res.data);
        },
        (error)=>(console.log(error)),
        ()=>{
        }
        );
      });
    this.showButton = false;
    this.buttonSaveText = "Save";
    console.log('saved');
    this.allMoves = [];
  }

getPhases(){
  this.phaseService.getAllPhases().subscribe(
    (data:any) => (this.phases = data.data),
    (error)=>  console.log(error),
    ()=>{
      this.buttonText = this.phases.length > 0 ? 'Add Another phase' : 'Add phase'; 
    }
  );
}

ngOnChanges(){
  this.getPhases();
}

  ngOnInit(){
    this.phaseService.getAllPhases().subscribe(
      (data:any) => (this.phases = data.data),
      (error)=>  console.log(error),
      ()=>{
        this.buttonText = this.phases.length > 0 ? 'Add Another phase' : 'Add phase'; 
      }
    );
  }

  addphase() {
    this.showInput= true;
    this.newPhase = '';
  }

   
  savePhase() {
    if (this.newPhase) {
      let phase = {
        'title':this.newPhase,
        'position': this.phases.length,
        'board_id': 1

      };
      this.phaseService.createPhase(phase).subscribe(
        (res:any) => (this.phases.push(res.data)),
        (error)=>  console.log(error),
        );
      this.newPhase = '';
      this.showInput = false;
    }
      
  }

  cancelPhase() {
    this.newPhase = '';
    this.showInput = false;
  }


  onlistDrop(event: CdkDragDrop<Phase>) {
    moveItemInArray(this.phases, event.previousIndex, event.currentIndex);
    console.log(event.container.id);
    console.log(event.previousContainer.id);
    console.log(event.container);
    console.log(event.previousContainer);
    if(event.currentIndex!=event.previousIndex){
      let phasePosition = this.phases.find(p=>p.position === event.previousIndex);
      if(phasePosition){
        if(event.currentIndex<event.previousIndex){

          let temp = this.phases.filter(p=>p.position>=event.currentIndex&& p.position<event.previousIndex);
     
            temp.forEach(element => {
              let phase = {
                'title':element.title,
                'position': ++element.position,
                'board_id': element.board.id
              };
              let index = this.phases.indexOf(element);
              this.phaseService.updatePhase(phase,element.id).subscribe(
                (res:any) => (this.phases[index] = res.data),
                (error)=>  console.log(error.error),
                );
            });
        }else{
          let temp = this.phases.filter(p=>p.position<=event.currentIndex&& p.position>event.previousIndex);
     
            temp.forEach(element => {
              let phase = {
                'title':element.title,
                'position': --element.position,
                'board_id': element.board.id
              };
              let index = this.phases.indexOf(element);
              this.phaseService.updatePhase(phase,element.id).subscribe(
                (res:any) => (this.phases[index] = res.data),
                (error)=>  console.log(error.error),
                );
            });
          }
          let phase = {
            'title':phasePosition.title,
            'position': event.currentIndex,
            'board_id': phasePosition.board.id
          };
  
          let index = this.phases.indexOf(phasePosition);
          this.phaseService.updatePhase(phase,phasePosition.id).subscribe(
            (res:any) => (this.phases[index] = res.data),
            (error)=>  console.log(error.error),
            );
      }
    }
  }

  deletePhase(id:number){
    this.phaseService.deletePhase(id).subscribe(
      (res:any)=>{
        console.log(res);
        let index = this.phases.findIndex(p=>p.id==id);
        if(index)
        this.phases.splice(index,1);
      this.getPhases();
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  changebackground(color:any){
 this.backgroundcolor=color;
  }


}
