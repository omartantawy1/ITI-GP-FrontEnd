import { Component, Input } from '@angular/core';
import { CardInterface } from '../interfaces/card-interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

@Input() card!: CardInterface;

}
