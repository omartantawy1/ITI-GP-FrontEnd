import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private api_tasks = 'http://127.0.0.1:8000/api/tasks';
  private token = (new TokenService).getToken();
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  })

  constructor(private http: HttpClient) { }

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