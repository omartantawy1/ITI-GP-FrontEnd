import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  private invitation_api = "http://127.0.0.1:8000/api/send-invitation";
  
  private headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient,private tokenService:TokenService) { 
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    })
  }

  
  sendInvitaion(invitation:any) {
    return this.http.post(this.invitation_api,invitation,{headers:this.headers});
  }

}
