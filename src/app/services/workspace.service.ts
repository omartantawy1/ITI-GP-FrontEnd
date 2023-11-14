import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Workspace } from '../interfaces/workspace';
import { Observable,Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  private api_workspace = 'http://127.0.0.1:8000/api/workspaces';
  public workspace = new Subject<Workspace>;
  getWorkspace$ = this.workspace.asObservable();
  
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient,private tokenService:TokenService) { 
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    }); 
  }
  SelectedWorkspace(workspace:any){
    console.log(workspace);
    this.workspace.next(workspace);
  }

  getAllWorkspaces(): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(this.api_workspace,{headers:this.headers});
  }

  getWorkspace(workspaceId: number): Observable<Workspace>{
    return this.http.get<Workspace>(`${this.api_workspace}/${workspaceId}`,{headers:this.headers});
  }

  createWorkspace(workspace: any) : Observable<Workspace>{
    return this.http.post<Workspace>(this.api_workspace, workspace,{headers:this.headers});
  }

  updateWorkspace(workspaceId: number, workspace: any): Observable<Workspace> {
    return this.http.put<Workspace>(`${this.api_workspace}/${workspaceId}`, workspace,{headers:this.headers});
  }

  deleteWorkspace(workspaceId: number): Observable<any> {
    return this.http.delete<any>(`${this.api_workspace}/${workspaceId}`,{headers:this.headers});
  }
  
}
