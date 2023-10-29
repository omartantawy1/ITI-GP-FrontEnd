import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { BoardComponent } from './board/board.component';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { SecondNavComponent } from './second-nav/second-nav.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { FilterButtonComponent } from './filter-button/filter-button.component';
import { EditMyProfileComponent } from './edit-my-profile/edit-my-profile.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    BoardComponent,
    SecondNavComponent,
       HomeComponent,
       ListComponent,
      FilterButtonComponent,
    EditMyProfileComponent,
        
 



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    DragDropModule,
    DropDownButtonModule,
    CdkDropList,
    CdkDrag,
    CdkMenuTrigger,
     CdkMenu, 
     CdkMenuItem,
     HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
