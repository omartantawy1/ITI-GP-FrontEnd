import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private api_reset_password = 'http://127.0.0.1:8000/api/auth/reset-password';

  constructor(private http: HttpClient) { }

  postResetPassword(user: any){
    return this.http.post(this.api_reset_password, user);
  }
}
