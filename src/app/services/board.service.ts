import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BoardInterface as Board }  from '../interfaces/board-interface';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private api_boards = 'http://127.0.0.1:8000/api/boards';

  constructor(private http: HttpClient) { }

  getAllBoards() {
    return this.http.get(this.api_boards);
  }

  getBoard(boardId: number) {
    return this.http.get(`${this.api_boards}/${boardId}`);
  }

  createBoard(board: Board) {
    return this.http.post(this.api_boards, board);
  }

  updateBoard(boardId: number, board: Board) {
    return this.http.put(`${this.api_boards}/${boardId}`, board);
  }

  deleteBoard(boardId: number) {
    return this.http.delete(`${this.api_boards}/${boardId}`);
  }
}