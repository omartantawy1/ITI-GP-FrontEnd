import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Workspace } from '../interfaces/workspace';


@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  private api_workspace = 'http://127.0.0.1:8000/api/workspaces';
  workspaces:Array<Workspace> = [];
  
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient,private tokenService:TokenService) { 
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    })
    this.getAllWorkspaces().subscribe(
      (res:any)=>{
        this.workspaces = res.data;
      },
      (error)=>{console.log(error)}
    );
  }

  getArrayOfWorkspace(){
    return this.workspaces;
  }


  getAllWorkspaces() {
    return this.http.get(this.api_workspace,{headers:this.headers});
  }

  getWorkspace(workspaceId: number) {
    return this.http.get(`${this.api_workspace}/${workspaceId}`,{headers:this.headers});
  }

  createWorkspace(workspace: Workspace) {
    return this.http.post(this.api_workspace, workspace,{headers:this.headers});
  }

  updateWorkspace(workspaceId: number, workspace: Workspace) {
    return this.http.put(`${this.api_workspace}/${workspaceId}`, workspace,{headers:this.headers});
  }

  deleteWorkspace(workspaceId: number) {
    return this.http.delete(`${this.api_workspace}/${workspaceId}`,{headers:this.headers});
  }
  
}
