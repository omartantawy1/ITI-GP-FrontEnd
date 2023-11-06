import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { GroupInterface } from '../interfaces/group-interface';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private api_groups = 'http://127.0.0.1:8000/api/groups';
  private token = (new TokenService).getToken();
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  })

  constructor(private http: HttpClient) { }

  createGroup(group: any){
    return this.http.post(this.api_groups,group,{headers:this.headers});
  }

  updateGroup(group: any){
    console.log(group,group.id);
    return this.http.put(`${this.api_groups}/${group.id}`,group,{headers:this.headers});
  }

  deleteGroup(group: any, groupID: number) {
    return this.http.delete(`${this.api_groups}/${groupID}`,{headers:this.headers});
  }
}
