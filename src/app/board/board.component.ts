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
  lists:Array<Phase>=[];
  showAddlistButton: boolean = true;
  buttonText: string = 'Add List'; 
  showInput:boolean = false;
  newPhase:string = '';

  constructor(private phaseservice: PhaseService){};


  ngOnInit(){
    this.phaseservice.getAllPhases().subscribe(
      (data:any) => (this.lists = data.data),
      (error)=>  console.log(error),
    );
  }
  
  ngOnChanges(){
    this.buttonText = this.lists.length > 0 ? 'Add Another List' : 'Add List'; 

  }
  


  



  addlist() {
    this.showInput= true;
    this.newPhase = '';
  }

   
  savePhase() {
    if (this.newPhase) {
      let phase = {
        'title':this.newPhase,
        'position': this.lists.length,
        'board_id': 16
      };
      this.phaseservice.createPhase(phase).subscribe(
        (res:any) => (this.lists.push(res.data)),
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
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
    if(event.currentIndex!=event.previousIndex){
      let phasePosition = this.lists.find(p=>p.position === event.previousIndex);
      if(phasePosition){
        if(event.currentIndex<event.previousIndex){

          let temp = this.lists.filter(p=>p.position>=event.currentIndex&& p.position<event.previousIndex);
     
            temp.forEach(element => {
              let phase = {
                'title':element.title,
                'position': ++element.position,
                'board_id': element.board.id
              };
              let index = this.lists.indexOf(element);
              this.phaseservice.updatePhase(phase,element.id).subscribe(
                (res:any) => (this.lists[index] = res.data),
                (error)=>  console.log(error.error),
                );
            });
        }else{
          let temp = this.lists.filter(p=>p.position<=event.currentIndex&& p.position>event.previousIndex);
     
            temp.forEach(element => {
              let phase = {
                'title':element.title,
                'position': --element.position,
                'board_id': element.board.id
              };
              let index = this.lists.indexOf(element);
              this.phaseservice.updatePhase(phase,element.id).subscribe(
                (res:any) => (this.lists[index] = res.data),
                (error)=>  console.log(error.error),
                );
            });
          }
          let phase = {
            'title':phasePosition.title,
            'position': event.currentIndex,
            'board_id': phasePosition.board.id
          };
  
          let index = this.lists.indexOf(phasePosition);
          this.phaseservice.updatePhase(phase,phasePosition.id).subscribe(
            (res:any) => (this.lists[index] = res.data),
            (error)=>  console.log(error.error),
            );
      }
    }
  }



  changebackground(color:any){
 this.backgroundcolor=color;
  }


}
