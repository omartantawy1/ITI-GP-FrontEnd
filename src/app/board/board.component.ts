import { Component,Input,Output } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { PhaseService } from '../services/phase.service';
import { PhaseInterface as Phase } from '../interfaces/phase-interface';
import { CardInterface as Card } from '../interfaces/card-interface';
import { CardService } from '../services/card.service';
import { NavbarWithAccountService } from '../services/navbar-with-account.service';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../services/board.service';
import { LoaderServicesService } from '../services/loader-services.service';
import { BoardInterface as Board } from '../interfaces/board-interface';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],

})
export class BoardComponent {
  
  backgroundcolor: string = "linear-gradient(to right, #1A2980, #26D0CE)";
  phases:Array<Phase>=[];
  showAddphaseButton: boolean = true;
  buttonText: string = 'Add phase'; 
  showInput:boolean = false;
  newPhase:string = '';
  board!:Board;
  
  buttonSaveText: string = 'Save'; 
  showButton:boolean = false;
  allMoves:Array<Card> = [];

  constructor(private loaderService:LoaderServicesService,private boardService:BoardService,private route:ActivatedRoute,private navbarService:NavbarWithAccountService,private phaseService: PhaseService,private cardService: CardService){
    
    this.loaderService.display(true);
  }; 

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
    this.navbarService.display();
    this.route.params.subscribe(params => {
      let data = params['id']  ;
      if(data){
        this.boardService.getBoard(data).subscribe(
          (res:any)=>{
            this.board = res.data;
            this.backgroundcolor = this.board.background_color;
            this.phases = this.board.phases;
            this.loaderService.display(false);
          },
          (error)=>{
            console.log(error);
          }
          );
      }

    });
/*     this.phaseService.getAllPhases().subscribe(
      (data:any) => (this.phases = data.data),
      (error)=>  console.log(error),
      ()=>{
        this.buttonText = this.phases.length > 0 ? 'Add Another phase' : 'Add phase'; 
      }
      ); */
  }

  editBackroundBoad(board:Board){
    this.board = board;
  }

  ngOnDestroy(){
    this.navbarService.hide();
    
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
        'board_id': this.board.id

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
                'board_id': this.board.id
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
                'board_id': this.board.id
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
            'board_id': this.board.id
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
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  changebackground(color:any){
 this.backgroundcolor=color;
  }


  deleteCategory(id:number){
   this.phaseService.getAllPhases().subscribe(
    (res:any)=>{
      this.phases = res.data;
    }
   );

  }

}
