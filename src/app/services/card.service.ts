import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private api_cards = 'http://127.0.0.1:8000/api/cards';

  constructor(private http: HttpClient) { }

  getAllCards() {
    return this.http.get(this.api_cards);
  }

  getCard(cardId: number) {
    return this.http.get(`${this.api_cards}/${cardId}`);
  }

  createCard(card: any) {
    return this.http.post(this.api_cards,card);
  }

  updateCard( card: any,cardId: number) {
    return this.http.put(`${this.api_cards}/${cardId}`, card);
  }

  deleteCard(cardId: number) {
    return this.http.delete(`${this.api_cards}/${cardId}`);
  }
}
