import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private api_tasks = 'http://127.0.0.1:8000/api/tasks';
  private headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient,private tokenService:TokenService) { 
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    })
  }

  createTask(task: any){
    return this.http.post(this.api_tasks,task,{headers:this.headers});
  }

  updateTask(task: any){
    return this.http.put(`${this.api_tasks}/${task.id}`,task,{headers:this.headers});
  }

  deleteTask(task: any) {
    return this.http.delete(`${this.api_tasks}/${task.id}`,{headers:this.headers});
  }
}
