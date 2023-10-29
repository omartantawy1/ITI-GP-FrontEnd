import { Component,Input } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray,transferArrayItem} from '@angular/cdk/drag-drop';
import { PhaseInterface as Phase } from '../interfaces/phase-interface';
import { PhaseService } from '../services/phase.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

  export class ListComponent {
  
  
    @Input() list! : Phase;
    
  
    showInput: boolean = false;
    newTask: string = '';
    newPhase: string = '';
    editIndex: number = -1;
    editableTitle: boolean = false;
  
    constructor(private phaseService:PhaseService){};

    enableTitleEdit() {
      
      this.editableTitle = true;
    }
  
    disableTitleEdit() {
      if (this.list.title) {
        let phase = {
          'title':this.list.title,
          'position': this.list.position,
          'board_id': this.list.board.id
        };
        this.phaseService.updatePhase(phase,this.list.id).subscribe(
          (res:any) => (this.list = res.data),
          (error)=>  console.log(error),
          );
      }
      this.editableTitle = false;

    }
  
    addTask() {
      this.showInput = true;
      this.newTask = ''; 
      this.editIndex = -1; 
    }

  
    saveTask() {
      // if (this.newTask) {
      //   if (this.editIndex === -1) {
      //     this.list.tasks.push(this.newTask);
      //   } else {
      //     this.list.tasks[this.editIndex] = this.newTask;
      //     this.editIndex = -1; 
      //   }
      //   this.newTask = '';
      //   this.showInput = false;
      // }
    }
  
    cancelTask() {
      this.newTask = '';
      this.showInput = false;
      this.editIndex = -1; 
    }
  
    editTask(index: number) {
      // this.newTask = this.list.tasks[index];
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


  
    

  

