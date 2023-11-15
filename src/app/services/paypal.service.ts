import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  private api_paypal = 'http://127.0.0.1:8000/api/paypal';
  
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient,private tokenService:TokenService) { 
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    })
  }

  getPayment(id: any) {
    return this.http.post(this.api_paypal,id,{headers:this.headers});
  }

  // getPayment() {
  //   return `${this.api_paypal}/payment`;
  // }
}
