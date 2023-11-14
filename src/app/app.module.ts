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
import { CdkDropList, CdkDrag} from '@angular/cdk/drag-drop';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CategoriesComponent } from './categories/categories.component';
import { UserInviteComponent } from './user-invite/user-invite.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SidebarWithWorkspaceComponent } from './sidebar-with-workspace/sidebar-with-workspace.component';
import { InvitationWorkspaceComponent } from './invitation-workspace/invitation-workspace.component';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentFailedComponent } from './payment-failed/payment-failed.component';
import { PaypalComponent } from './paypal/paypal.component';
import { PricingComponent } from './pricing/pricing.component';
import { UserfoundPopupComponent } from './userfound-popup/userfound-popup.component';
import { UsernotfoundPopupComponent } from './usernotfound-popup/usernotfound-popup.component';




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
    UserInviteComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    SidebarWithWorkspaceComponent,
    InvitationWorkspaceComponent,
    PaymentSuccessComponent,
    PaymentFailedComponent,
    PaypalComponent,
    PricingComponent,
    UserfoundPopupComponent,
    UsernotfoundPopupComponent

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
     MatInputModule,
     BrowserAnimationsModule,
     MatNativeDateModule, // Required for the date picker
     MatFormFieldModule, 
     MatDatepickerModule,
    
    

    
  ],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
