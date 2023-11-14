import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarWithAccountService {

  showNavBar: BehaviorSubject<boolean>;
  constructor() { 
    this.showNavBar = new BehaviorSubject(true);
  }

  hide(){
    this.showNavBar.next(false);
  }

  display(){
    this.showNavBar.next(true);
  }
  
  
}
