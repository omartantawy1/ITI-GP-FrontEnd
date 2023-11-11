import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api_current_user = 'http://127.0.0.1:8000/api/user';
  private headers:HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient,private tokenService:TokenService) { 
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenService.getToken()}`
    })
  }

  getCurrentUser() {
    return this.http.get(this.api_current_user,{headers:this.headers});
  }

  
}
