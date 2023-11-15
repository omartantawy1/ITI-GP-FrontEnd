import { Component } from '@angular/core';
import { NavbarWithAccountService } from './services/navbar-with-account.service';
import { Subscription } from 'rxjs';
import { LoaderServicesService } from './services/loader-services.service';

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
  showLoader: boolean=false;
  
  constructor(private navbarService:NavbarWithAccountService,private loaderService: LoaderServicesService){
    //for the navbar
    this.subscription = this.navbarService.showNavBar.subscribe(
      (value)=>{
        this.showNaAllBar = value;
      }
    );
    //for the spinner
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
  }



  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  }