import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api_current_user = 'http://127.0.0.1:8000/api/auth/user';
  
  private headers: HttpHeaders = new HttpHeaders();
  private header: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient,private tokenService:TokenService) { 
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    })
  }


  
  getCurrentUserWithToken(token:Token) {
    this.header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.api_current_user,{headers:this.header});
  }
  getCurrentUser() {
    return this.http.get(this.api_current_user,{headers:this.headers});
  }
  
}
