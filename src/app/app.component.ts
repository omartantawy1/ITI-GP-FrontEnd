import { Component } from '@angular/core';
import { NavbarWithAccountService } from './services/navbar-with-account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TaskFlow';

   workspace:any;
   getworkspace(workspace:any){
    this.workspace=workspace;
   }
   setWorkSpace(workspace:any){
    this.workspace=workspace;
   }


   showNaAllBar:boolean = false;
  subscription:Subscription;
  
  constructor(private navbarService:NavbarWithAccountService){
    this.subscription = this.navbarService.showNavBar.subscribe(
      (value)=>{
        this.showNaAllBar = value;
      }
    );
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  }