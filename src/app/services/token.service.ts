import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  // protected token: string | null = null;

  constructor() { }

  getToken(){
    return localStorage.getItem('token');
  }

  setToken(temp: string){
    localStorage.setItem('token', temp);
  }

  clearToken(){
    localStorage.clear();
  }
}
