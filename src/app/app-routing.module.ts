  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import { SignUpComponent } from './sign-up/sign-up.component';
  import { SignInComponent } from './sign-in/sign-in.component';
import { BoardComponent } from './board/board.component';
import { EditMyProfileComponent } from './edit-my-profile/edit-my-profile.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { HomeComponent } from './home/home.component';


  const routes: Routes = [
    { path: '', component: HomeComponent }, 
    { path: 'sign-up', component: SignUpComponent }, 
    { path: 'sign-in', component: SignInComponent },
    {path:'board',component:BoardComponent},
    {path:'edit-profile',component:EditMyProfileComponent},
    {path:'workspace',component:WorkspaceComponent},
    
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
