import { Injectable, inject } from '@angular/core';
import { PhaseInterface as Phase} from '../interfaces/phase-interface';
import { PhaseService } from './phase.service';
import { CardService } from './card.service';
import { Database, get, listVal, objectVal, orderByChild, orderByKey, orderByValue, query, ref, set, update } from '@angular/fire/database';
import { error } from 'jquery';
import { CardInterface as Card } from '../interfaces/card-interface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db:Database,private cardService:CardService,private phaseService:PhaseService) { }

  savePositions(phase:Phase|any ) {
      update(ref(this.db,'phases/'+phase.id),phase).then(()=>{
        console.log("success add");
      });
  }
  getPhases(){
    listVal(query(ref(this.db,'phases'))).subscribe(
      (data:any)=>{
          return data;
      }
    );
  }
  
  getPhase(phase:Phase){
    objectVal(query(ref(this.db,'phases/'+phase.id))).subscribe(
      (data:any)=>{
        console.log(data);
          return data;
      }
    );
  }


  savePositionsCards(card:Card ) {
    
    update(ref(this.db,'cards/'+card.id),card).then(()=>{
      console.log("success add");
    });
  }

  savePositionsCardsByPhaseId(phase_id:number,card:Card ) {
    update(ref(this.db,'phases/'+phase_id+"/cards/"+card.id),card).then(()=>{
      console.log("success add");
    });
  }
  savePositionsCardsWithDatabase(card:Card ) {
    update(ref(this.db,'cards/'+card.id),card).then(()=>{
      this.cardService.updateCard(card,card.id).subscribe(
        (res:any)=>{console.log('add database');},
        (error)=>{console.log(error)}
      );
    });
  }

  getCards(){
    listVal(query(ref(this.db,'cards'))).subscribe(
      (data:any)=>{
          return data;
      }
    );
  }
  
  getCard(card:Card){
    objectVal(query(ref(this.db,'cards/'+card.id))).subscribe(
      (data:any)=>{
        console.log(data);
          return data;
      }
    );
  }
  
}
