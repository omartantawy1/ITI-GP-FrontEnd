import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {


  constructor(private router:Router) { }

  getToken(){
    return localStorage.getItem('token');
  }

  setToken(temp: string){
    localStorage.setItem('token', temp);
    this.router.navigate(['workspace']);
    
  }

  clearToken(){
    localStorage.clear();
  }
}
