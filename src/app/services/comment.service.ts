import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private api_comments = 'http://127.0.0.1:8000/api/comments';
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient,private tokenService:TokenService) { 
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenService.getToken()}`
    })
  }
  getAllComments() {
    return this.http.get(this.api_comments,{headers:this.headers});
  }

  getComment(commentId: number) {
    return this.http.get(`${this.api_comments}/${commentId}`,{headers:this.headers});
  }

  createComment(comment: any) {
    return this.http.post(this.api_comments,comment,{headers:this.headers});
  }

  updateComment( comment: any,commentId: number) {
    return this.http.put(`${this.api_comments}/${commentId}`, comment,{headers:this.headers});
  }

  deleteComment(commentId: number) {
    return this.http.delete(`${this.api_comments}/${commentId}`,{headers:this.headers});
  }
}
