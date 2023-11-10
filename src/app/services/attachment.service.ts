import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttaachmentService {

  private api_attachments = 'http://127.0.0.1:8000/api/attachments';
  private token = (new TokenService).getToken();
  headers: HttpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  })

  constructor(private http: HttpClient, private router: Router) { }

  createAttachment(attachment: any){
    return this.http.post(this.api_attachments,attachment,{headers:this.headers});
  }

  updateAttachment(attachment: any){
    return this.http.put(`${this.api_attachments}/${attachment.id}`,attachment,{headers:this.headers});
  }

  deleteAttachment(attachment: any) {
    return this.http.delete(`${this.api_attachments}/${attachment.id}`,{headers:this.headers});
  }

  downloadAttachment(attachment: any) :Observable<Blob> {
    return this.http.get(`${this.api_attachments}/${attachment.id}/download`,{headers:this.headers, responseType: 'blob'});
  }
}