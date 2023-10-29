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
  lists!:Array<Phase> ;
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
        'position': 1,
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

  editTask(index: number) {
    // this.newTask = this.list.tasks[index];
    // this.editIndex = index;
  }


  onlistDrop(event: CdkDragDrop<Phase>) {
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
  }



  changebackground(color:any){
 this.backgroundcolor=color;
  }


}
