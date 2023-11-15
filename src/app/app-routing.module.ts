import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { BoardComponent } from './board/board.component';
import { EditMyProfileComponent } from './edit-my-profile/edit-my-profile.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { UserInviteComponent } from './user-invite/user-invite.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SidebarWithWorkspaceComponent } from './sidebar-with-workspace/sidebar-with-workspace.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentFailedComponent } from './payment-failed/payment-failed.component';
import { PaypalComponent } from './paypal/paypal.component';
import { HomeComponent } from './home/home.component';
import { PricingComponent } from './pricing/pricing.component';
import { authGuardGuard } from './guards/auth-guard.guard';

  const routes: Routes = [
    { path: '', component: HomeComponent }, 
    { path:'sign-in', component: SignInComponent },
    { path:'sign-up', component: SignUpComponent },
    {path:'board',component:BoardComponent, canActivate: [authGuardGuard]},
    {path:'board/:id',component:BoardComponent, canActivate: [authGuardGuard]},
    {path:'workspace',component:SidebarWithWorkspaceComponent, canActivate: [authGuardGuard]},
    {path:'workspace/:id',component:SidebarWithWorkspaceComponent, canActivate: [authGuardGuard]},
    {path:'workspace/token',component:SidebarWithWorkspaceComponent, canActivate: [authGuardGuard]},
    {path:'edit-profile',component:EditMyProfileComponent, canActivate: [authGuardGuard]},
    {path:'user-invitation',component:UserInviteComponent, canActivate: [authGuardGuard]},
    {path:'forget-password',component:ForgetPasswordComponent},
    {path:'reset-password',component:ResetPasswordComponent},
    {path:'payment-success',component:PaymentSuccessComponent, canActivate: [authGuardGuard]},
    {path:'payment-failed',component:PaymentFailedComponent, canActivate: [authGuardGuard]},
    {path:'paypal',component:PaypalComponent, canActivate: [authGuardGuard]},
    {path:'home',component:HomeComponent},
    {path:'pricing',component:PricingComponent},
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
