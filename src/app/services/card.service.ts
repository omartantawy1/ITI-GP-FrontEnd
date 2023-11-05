import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardService {

/*   private api_cards = 'http://127.0.0.1:8000/api/cards'; */
  private api_cards = 'https://test-backend.exoticmarkets-co.com/api/cards';

  constructor(private http: HttpClient) { }
  private token = "2|W8NLCVm5cfu5hDOlu0i4SDzIu8FT8dJCxG6oIJAw5f915f2a";
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  })

  getAllCards() {
    return this.http.get(this.api_cards,{headers:this.headers});
  }

  getCard(cardId: number) {
    return this.http.get(`${this.api_cards}/${cardId}`,{headers:this.headers});
  }

  createCard(card: any) {
    return this.http.post(this.api_cards,card,{headers:this.headers});
  }

  updateCard( card: any,cardId: number) {
    return this.http.put(`${this.api_cards}/${cardId}`, card,{headers:this.headers});
  }

  deleteCard(cardId: number) {
    return this.http.delete(`${this.api_cards}/${cardId}`,{headers:this.headers});
  }
}
