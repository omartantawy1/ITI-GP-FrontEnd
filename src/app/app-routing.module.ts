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


  const routes: Routes = [
    { path: '', component: SignUpComponent }, 
    { path:'sign-in', component: SignInComponent },
    { path:'sign-up', component: SignUpComponent },
    {path:'board',component:BoardComponent},
    {path:'workspace',component:SidebarWithWorkspaceComponent},
    {path:'edit-profile',component:EditMyProfileComponent},
    {path:'user-invitation',component:UserInviteComponent},
    {path:'forget-password',component:ForgetPasswordComponent},
    {path:'reset-password',component:ResetPasswordComponent}
    
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
