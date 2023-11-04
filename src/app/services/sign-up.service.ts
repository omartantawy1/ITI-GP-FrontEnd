import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  protected register_api = 'http://127.0.0.1:8000/api/auth/register';
  protected response_api: any;

  constructor(private http: HttpClient, private tokenservice: TokenService) { }

  createUser(user: any){
    // response_api = 
    // let res: any = this.http.post(this.register_api,user);
    // if (res.status!) {
    //   // this.response_api = this.http.post(this.register_api,user);
    //   this.tokenservice.setToken(res);
    return this.http.post(this.register_api,user);
    }
  
}
