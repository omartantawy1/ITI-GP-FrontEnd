import { Component,Input,Output } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { PhaseService } from '../services/phase.service';
import { PhaseInterface as Phase, PhaseInterface } from '../interfaces/phase-interface';

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

  constructor(private phaseService: PhaseService){};


  ngOnInit(){
    this.phaseService.getAllPhases().subscribe(
      (data:any) => (this.phases = data.data),
      (error)=>  console.log(error),
      ()=>{
        this.buttonText = this.phases.length > 0 ? 'Add Another phase' : 'Add phase'; 
      }
    );
  }
  
  ngOnChanges(){
    

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
        'board_id': 5
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



  changebackground(color:any){
 this.backgroundcolor=color;
  }


}
