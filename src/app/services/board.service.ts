import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BoardInterface as Board }  from '../interfaces/board-interface';
import { TokenService } from './token.service';
import { Observable,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  
  private api_boards = 'http://127.0.0.1:8000/api/boards';
  public workspace = new Subject<Board>;
  getWorkspace$ = this.workspace.asObservable();
  
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient,private tokenService:TokenService) { 
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    })
  }

  SelectedBoard(board:any){
    console.log(board);
    this.workspace.next(board);
  }


  getAllBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.api_boards,{headers:this.headers});
  }

  getBoard(boardId: number): Observable<Board>  {
    return this.http.get<Board>(`${this.api_boards}/${boardId}`,{headers:this.headers});
  }

  createBoard(board: any): Observable<Board>  {
    return this.http.post<Board>(this.api_boards, board,{headers:this.headers});
  }

  updateBoard(boardId: number, board: any): Observable<Board>  {
    return this.http.put<Board>(`${this.api_boards}/${boardId}`, board,{headers:this.headers});
  }

  deleteBoard(boardId: number): Observable<any>  {
    return this.http.delete<any>(`${this.api_boards}/${boardId}`,{headers:this.headers});
  }
}