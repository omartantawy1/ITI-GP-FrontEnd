import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  private api_attachments = 'http://127.0.0.1:8000/api/attachments';
  private headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient,private tokenService:TokenService) { 
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    })
  }

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
