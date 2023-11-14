import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private api_groups = 'http://127.0.0.1:8000/api/groups';
  private headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient,private tokenService:TokenService) { 
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    })
  }

  createGroup(group: any){
    return this.http.post(this.api_groups,group,{headers:this.headers});
  }

  updateGroup(group: any){
    return this.http.put(`${this.api_groups}/${group.id}`,group,{headers:this.headers});
  }

  deleteGroup(group: any) {
    return this.http.delete(`${this.api_groups}/${group.id}`,{headers:this.headers});
  }
}
