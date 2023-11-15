import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  private api_forget_password = 'http://127.0.0.1:8000/api/auth/forgot-password';

  constructor(private http: HttpClient) { }

  postForgetPassword(email: string){
    return this.http.post(this.api_forget_password, email);
  }
}
