import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  protected register_api = 'http://127.0.0.1:8000/api/auth/register';

  constructor(private http: HttpClient) { }

  createUser(user: any){
    return this.http.post(this.register_api,user);
  } 
}
