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
import { HomeComponent } from './home/home.component';


  const routes: Routes = [
    { path: '', component: SignUpComponent }, 
    {path:'home', component: HomeComponent},
    { path:'sign-in', component: SignInComponent },
    { path:'sign-up', component: SignUpComponent },
    {path:'board',component:BoardComponent},
    {path:'edit-profile',component:EditMyProfileComponent},
    {path:'workspace',component:WorkspaceComponent},
    {path:'user-invitation',component:UserInviteComponent}
 
    
    
    
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
