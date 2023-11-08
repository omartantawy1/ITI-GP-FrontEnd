import { Component, Input } from '@angular/core';

@Component({
  selector: 'workspace',
  templateUrl: './user-workspaces.component.html',
  styleUrls: ['./user-workspaces.component.css']
})
export class UserWorkspacesComponent {
  @Input() workspace!: { id:number,  name: string,description:string ,boards:Array<any>};
  
}
