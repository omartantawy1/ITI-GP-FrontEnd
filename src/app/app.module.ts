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
import { FilterButtonComponent } from './filter-button/filter-button.component';
import { EditMyProfileComponent } from './edit-my-profile/edit-my-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { AccountButtonComponent } from './account-button/account-button.component';
import { PhaseComponent } from './phase/phase.component';
import { ShareDialogComponent } from './share-dialog/share-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import{MatFormFieldModule} from '@angular/material/form-field';
import{MatInputModule} from '@angular/material/input';
import { WorkspaceComponent } from './workspace/workspace.component';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PopupCreateWorkspaceComponent } from './popup-create-workspace/popup-create-workspace.component';
import { CardComponent } from './card/card.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { CategoriesComponent } from './categories/categories.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    BoardComponent,
    SecondNavComponent,
       HomeComponent,
      FilterButtonComponent,
    EditMyProfileComponent,
    AccountButtonComponent,
    PhaseComponent,
    ShareDialogComponent,
    WorkspaceComponent,
    MainNavbarComponent,
    SidebarComponent,
    PopupCreateWorkspaceComponent,
    CardComponent,
    CategoriesComponent,
   
    
  
        
 



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
     MatDialogModule, 
     HttpClientModule,
     MatButtonModule,
     MatFormFieldModule,
     MatInputModule,
     MatInputModule,
     FormsModule,
     ReactiveFormsModule,
     MatButtonModule,
     BrowserAnimationsModule,
     MatNativeDateModule, // Required for the date picker
     MatFormFieldModule, 
     MatDatepickerModule,
    
   

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
