import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignOutService {

  protected logout_api = 'http://127.0.0.1:8000/api/auth/logout';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  })

  constructor(private http: HttpClient, private token: TokenService) { }

  logout(){
    return this.http.delete(this.logout_api,{headers: this.headers});
  }
}
