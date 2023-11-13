import { Component,Input,Output } from '@angular/core';
import {EventEmitter } from '@angular/core';
@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css']
})
export class MainNavbarComponent {



  workspaces:Array<any> = [
    {
      id:1,
      name:'Workpsace',
      description:"new workspace",
      boards:[{
        id:1,
        title:'Workpsace1',
        color:'red',
      },
      {
        id:2,
        title:'workboard',
        color:'purble',
      },
      {
        id:3,
        title:'workbench',
        color:'fuschia',
      }
    ]
    },
    {
      id:2,
      name:'rewas',
      description:"new workspace",
      boards:[{
        id:1,
        title:'gp task',
        color:'red',
      },
      {
        id:2,
        title:'Ai task',
        color:'purble',
      },
    ]
    },
    
  ];



}
