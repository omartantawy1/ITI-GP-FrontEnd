import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api_current_user = 'http://127.0.0.1:8000/api/user';
  private token = "5|JEBW5tuGQZ3M274gX975fHMlaoi9tm30YxOsjCFP2f5f4c24";
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  })
  constructor(private http: HttpClient) { }

  getCurrentUser() {
    return this.http.get(this.api_current_user,{headers:this.headers});
  }

  
}
