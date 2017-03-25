import {Component, OnInit} from '@angular/core';
import {BoardItem} from '../board-item/board-item';
import {MatrixService} from '../board-item/board.service';
import {GameState} from './game-state';
@Component({
  selector: 'app-game',
  template: `
      <div class='board'>
        <div class='title'>Tic Tac Toe</div>
        <button class='btn btn-primary' (click)='onNewGameClicked()'>New game</button>
        <div class='action' *ngIf='matrixService.gameState == 2'>Player 'X' won</div>
        <div class='action' *ngIf='matrixService.gameState == 3'>Player 'O' won</div>
        <div class='action' *ngIf='matrixService.gameState == 4'>It's a draw</div>
        <div class='action' *ngIf='matrixService.gameState == 1'>'O's turn</div>
        <div class='action' *ngIf='matrixService.gameState == 0'>'X's turn</div>
        <div class='item-row' *ngFor='let row of this.matrixService.items'>
            <app-board-item *ngFor='let col of row' [boardItem]='col' (itemClick)='onItemClick(col)'></app-board-item>
        </div>
      </div>
    `,
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