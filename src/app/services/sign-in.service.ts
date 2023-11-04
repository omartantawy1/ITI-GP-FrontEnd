import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  protected login_api = 'http://127.0.0.1:8000/api/auth/login';

  constructor(private http: HttpClient, private tokenservice: TokenService) { }

  verifyUser(user: any){
    let res: any = this.http.post(this.login_api,user);
    if (res.status) {
      this.tokenservice.setToken(res);
    }
    return this.http.post(this.login_api,user);
  }
}
