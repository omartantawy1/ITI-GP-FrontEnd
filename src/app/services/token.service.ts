import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  protected token: any;

  constructor() { }

  getToken(){
    return this.token;
  }

  setToken(temp: any){
    this.token = temp;
  }
}
