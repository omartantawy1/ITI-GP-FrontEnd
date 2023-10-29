import { Component,Input,Output } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { PhaseService } from '../services/phase.service';
import { PhaseInterface as Phase } from '../interfaces/phase-interface';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],

})
export class BoardComponent {

  backgroundcolor!: any;

  lists!:Array<Phase> ;
 
  constructor(private phaseservice: PhaseService){};


  ngOnInit(){
    this.phaseservice.getAllPhases().subscribe(
      (data:any) => (this.lists = data.data),
      (error)=>  console.log(error),
    );
}



  
  showAddlistButton: boolean = true;
  buttonText: string = 'Add List'; 


  addlist() {
     {
      const newlist = {
        id: this.lists.length + 1,
        title: '',
        tasks: [],
      };
      // this.lists.push(newlist);
      this.buttonText = this.lists.length > 0 ? 'Add Another List' : 'Add List';
    
    }
  }


  onlistDrop(event: CdkDragDrop<{ id: number; title: string; tasks: string[] }[]>) {
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
  }



  changebackground(color:any){
 this.backgroundcolor=color;
  }


}
