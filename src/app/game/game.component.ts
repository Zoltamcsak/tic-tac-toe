import {Component, OnInit} from '@angular/core';
import {BoardItem} from '../board-item/board-item';
import {MatrixService} from '../board-item/board.service';
import {GameState} from './game-state';
@Component({
  selector: 'app-game',
  template: `
    <button class='btn btn-primary' (click)='onNewGameClicked()'>New game</button>
    <div *ngIf='matrixService.won'>Player {{matrixService.gameState}} won</div>
    <div *ngIf='matrixService.draw'>It's a draw</div>
    <div class='item-row' *ngFor='let row of this.matrixService.items'>
        <app-board-item *ngFor='let col of row' [state]='col.state' (itemClick)='onItemClick(col)'></app-board-item>
    </div>`,
  styleUrls: ['game.scss']
})
export class GameComponent implements OnInit {
  constructor(public matrixService: MatrixService) {}

  ngOnInit(): void {
    this.matrixService.init();
  }

  onItemClick(item: BoardItem): void {
    if (this.isPlayersMove()) {
      this.matrixService.updateBoard(item);
    }
  }

  onNewGameClicked(): void {
    this.matrixService.localStorageService.set('board', null);
    this.matrixService.init();
  }

  isPlayersMove(): boolean {
    return this.matrixService.gameState === GameState.X_TURN;
  }
}