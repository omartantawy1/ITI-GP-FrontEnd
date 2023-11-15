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
    console.log(temp);
    localStorage.setItem('token', temp);/* 
    this.router.navigate(['workspace/token',temp]); */
    window.open('http://localhost:4200/workspace/token?token='+temp,'_self');
    
  }

  clearToken(){
    localStorage.clear();
  }
}
