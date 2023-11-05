import { Component,Input,Output } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { PhaseService } from '../services/phase.service';
import { PhaseInterface as Phase } from '../interfaces/phase-interface';
import { CardInterface as Card } from '../interfaces/card-interface';
import { CardService } from '../services/card.service';
import { count } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { Database, objectVal, query, ref } from '@angular/fire/database';

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

  constructor(private phaseService: PhaseService,private cardService: CardService,private firebaseService:FirebaseService,private db:Database){}; 

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



  ngOnInit(){
    this.phaseService.getAllPhases().subscribe(
      (data:any) => {
        this.phases = [];
          data.data.forEach((element:Phase)=>{
            objectVal(query(ref(this.db,'phases/'+element.id+"/position"))).subscribe(
              (res:any)=>{
                console.log(res);
                if(res!=null){
                  element.position = res;
                  this.phases[res] = element;

                }else{
                  this.firebaseService.savePositions(element);
                  this.phases[element.position] = element;
                }
              }
            );
          });
        },
        (error)=>  console.log(error),
        ()=>{
        this.buttonText = this.phases.length > 0 ? 'Add Another phase' : 'Add phase'; 
      }
    );
    this.firebaseService.getPhases();
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
        'board_id': this.phases[0]?this.phases[0].board.id:0

      };
      this.phaseService.createPhase(phase).subscribe(
        (res:any) => {this.phases.push(res.data)
        this.firebaseService.savePositions(res.data);
        },
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


  onlistDrop(event: CdkDragDrop<any>) {
    moveItemInArray(this.phases, event.previousIndex, event.currentIndex);
    if(event.currentIndex!=event.previousIndex){
      let phasePosition = this.phases.find(p=>p.position === event.previousIndex);
      if(phasePosition){
        console.log(event.container);
        
    if(event.currentIndex<event.previousIndex){

          let left = this.phases.filter(p=>p.position>=event.currentIndex&&p.position<event.previousIndex);

          left.forEach(element => {
              element.position = ++(element.position)
              this.firebaseService.savePositions(element);
            });
        }else if(event.currentIndex>event.previousIndex){
          let right = this.phases.filter(p=>p.position<=event.currentIndex&&p.position>event.previousIndex);
     
            right.forEach(element => {
              element.position = --(element.position);
              this.firebaseService.savePositions(element);
              });
            }
            phasePosition.position = event.currentIndex;
            this.firebaseService.savePositions(phasePosition);
      }
    }
  }



  changebackground(color:any){
 this.backgroundcolor=color;
  }


}
