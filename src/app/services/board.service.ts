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

  getAllBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.api_boards);
  }

  getBoard(boardId: number): Observable<Board> {
    return this.http.get<Board>(`${this.api_boards}/${boardId}`);
  }

  createBoard(board: Board): Observable<Board> {
    return this.http.post<Board>(this.api_boards, board);
  }

  updateBoard(boardId: number, board: Board): Observable<Board> {
    return this.http.put<Board>(`${this.api_boards}/${boardId}`, board);
  }

  deleteBoard(boardId: number): Observable<void> {
    return this.http.delete<void>(`${this.api_boards}/${boardId}`);
  }
}