import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { PhaseInterface as Phase } from '../interfaces/phase-interface';
import { PhaseService } from '../services/phase.service';
import { CardService } from '../services/card.service';
import { CardInterface as Card } from '../interfaces/card-interface';


@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.css']
})
export class PhaseComponent {
  /* get phase and all phases from parent commponent (Board Compenent) */
  @Input() phase!: any | Phase;
  @Input() phases: Array<Phase> = [];


  @Output() unSave = new EventEmitter<boolean>();
  @Output() cards = new EventEmitter<Array<Card>>();

  /* send data to paprent to delete phase from board */
  @Output() delPhase = new EventEmitter<number>();

  isUnSave: boolean = false;
  allMoves: Array<Card> = [];

  /* all variables for phases edit or delete or update and */
  isThreeDotsVisible: boolean = false;
  editIndex: number = -1;
  showInput: boolean = false;
  editPhaseTitle: boolean = false;

  /* all variables for cards on phases edit title and delete and update and add */
  isCardOpen: boolean = true;
  card!: Card;
  editCardTitle: boolean = false;
  newcard: string = '';

  /* initialize all variables to use services connect with database for any query */
  constructor(private phaseService: PhaseService, private cardService: CardService) { };

  /* ---------------------- all crud functions on phase -------------------- */

  /* toggle btn option delete phase */
  toggleThreeDots() {
    this.isThreeDotsVisible = !this.isThreeDotsVisible;
  }

  /* delete phase by send to parent and delete and remove this phase from front */
  deletePhase(id: number) {
    this.isThreeDotsVisible = false;
    this.delPhase.emit(id);
    this.phase = null;
  }


  /*----------------- function open edit title for phase  --------------*/
  enableTitleEdit() {

    this.editPhaseTitle = true;
  }

  /*----------------- function when click enter close edit title for phase and savev change update on phase  --------------*/
  disableTitleEdit() {
    if (this.phase.title) {
      let phase = {
        'title': this.phase.title,
        'position': this.phase.position,
        'board_id': this.phase.board
      };
      this.phaseService.updatePhase(phase, this.phase.id).subscribe(
        (res: any) => (this.phase = res.data),
        (error) => console.log(error),
      );
    }
    this.editPhaseTitle = false;

  }
  /* ---------------- end crud functions on phases ----------------- */

  /* ----------------------------------------------- */

  /* ---------------- all crud functions on cards ----------------- */

  /* function open details in card as popup */
  openCard(card: Card) {
    this.isCardOpen = false;
    this.card = card;
  }


  /* function open add new card by button add card */
  addcard() {
    this.showInput = true;
    this.newcard = '';
  }

  /* function cancel add card */
  cancelcard() {
    this.newcard = '';
    this.showInput = false;
  }

  /* function add and save on database card */
  saveCard() {
    if (this.newcard) {
      let card = {
        'title': this.newcard,
        'position': this.phase.cards!.length,
        'phase_id': this.phase.id
      };
      this.cardService.createCard(card).subscribe(
        (res: any) => (this.phase.cards!.push(res.data)),
        (error) => console.log(error),
        () => console.log('success')
      );
    }
    this.newcard = '';
    this.showInput = false;

  }


  /* function open button update title cards */
  enableCardTitleEdit(index: number) {
    this.newcard = this.phase.cards![index].title;
    this.editIndex = index;
  }

  /* function update card title */
  updateCardTitle(index: number) {
    if (this.newcard) {
      let card = {
        'title': this.newcard,
        'phase_id': this.phase.id
      };
      this.cardService.updateCard(card, this.phase.cards![index].id).subscribe(
        (res: any) => (this.phase.cards![index] = res.data),
        (error) => console.log(error),
        () => console.log('success')
      );
    }
    this.newcard = '';
    this.editIndex = -1;
  }


  /* function on exchange cards (drag and drop) */
  async onDrop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.rankingCardCurrent(event.container.data, null, event);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      let current = event.container.id.split("-");
      let phaseNext = this.phases.find(p => p.position == +current[current.length - 1] - 1);
      if (phaseNext) {

        this.rankingCardCurrent(event.container.data, phaseNext.id, event);

        this.rankingCardCurrent(event.previousContainer.data, null, event);
      }
    }
    this.unSave.emit(true);

  }

  /* update positions for cards after change drag and drop poistions cards ui */
  rankingCardCurrent(cards: Array<Card>, phase_id: number | null, event: CdkDragDrop<any>) {
    cards.forEach(element => {
      const index = cards.indexOf(element);
      element.position = index;
      element.phase_id = phase_id ? phase_id : element.phase_id;
      if (this.allMoves.length > 0) {
        let indexMove = this.allMoves.indexOf(element);
        this.allMoves.includes(element) ? this.allMoves[indexMove] = element : this.allMoves.push(element);
      } else {
        this.allMoves.push(element);
      }
    });
    this.cards.emit(this.allMoves);
  }
  /*------------------------- end all crud functions on cards -------------------------- */


}