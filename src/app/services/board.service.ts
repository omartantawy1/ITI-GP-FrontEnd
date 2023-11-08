import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BoardInterface as Board }  from '../interfaces/board-interface';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  
  private api_boards = 'http://127.0.0.1:8000/api/boards';

  constructor(private http: HttpClient) { }
  private token = "2|pnyIBOFZZSkLhTZdmOoLq5mCTq9EnTYkWUq5rUBQe9c646de";
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  })

  getAllBoards() {
    return this.http.get(this.api_boards,{headers:this.headers});
  }

  getBoard(boardId: number) {
    return this.http.get(`${this.api_boards}/${boardId}`,{headers:this.headers});
  }

  createBoard(board: Board) {
    return this.http.post(this.api_boards, board,{headers:this.headers});
  }

  updateBoard(boardId: number, board: Board) {
    return this.http.put(`${this.api_boards}/${boardId}`, board,{headers:this.headers});
  }

  deleteBoard(boardId: number) {
    return this.http.delete(`${this.api_boards}/${boardId}`,{headers:this.headers});
  }
}