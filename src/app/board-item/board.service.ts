import {Injectable} from '@angular/core';
import {BoardItem} from './board-item';
import {ItemState} from './item-state';
import {GameState} from '../game/game-state';
import {LocalStorageService} from 'angular-2-local-storage';
@Injectable()
export class MatrixService {
  public items: BoardItem[][] = [];
  public gameState: GameState;
  public boardLines: any[];
  public won: boolean;
  public draw: boolean;

  constructor(public localStorageService: LocalStorageService) {}

  public init(): void {
    this.gameState = GameState.X_TURN;
    if (this.localStorageService.get('board') !== null) {
      this.initBoardFromLocalStorage();
      this.initGameStateFromLocalStorage();
    } else {
      this.initBoardManually();
      this.initGameStateManually();
    }
  }

  public updateBoard(item: BoardItem): void {
    if (this.gameState === GameState.X_TURN) {
      item.state = this.getNextState();
    }
    this.updateGameState();
    setTimeout(() => {
      this.computerMove();
      this.localStorageService.set('board', this.items);
    }, 1000);
  }

  public initBoardFromLocalStorage(): void {
    this.items = this.localStorageService.get('board') as BoardItem[][];
  }

  public initGameStateFromLocalStorage(): void {
    this.gameState = this.localStorageService.get('gameState') as GameState;
    this.won = this.localStorageService.get('won') as boolean;
    this.draw = this.localStorageService.get('draw') as boolean;
    this.boardLines = this.localStorageService.get('boardLines') as any[];
  }

  public initGameStateManually(): void {
    this.boardLines = [];
    this.setBoardLines();
    this.won = false;
    this.draw = false;
  }

  public initBoardManually(): void {
    for (let i=0; i<3; i++) {
      this.items[i] = [];
      for (let j=0; j<3; j++) {
        let item = {state: ItemState.NOTHING};
        this.items[i].push(item);
      }
    }
  }

  public getNextState(): ItemState {
    return this.gameState === GameState.X_TURN ? ItemState.X : ItemState.O;
  }

  updateGameState(): void {
    let winningPlayer = this.isWinning();
    if (winningPlayer === ItemState.NOTHING) {
      if (this.isDraw()) {
        this.draw = true;
      } else if (this.gameState === GameState.X_TURN) {
        this.gameState = GameState.O_TURN;
      } else {
        this.gameState = GameState.X_TURN;
      }
    } else {
      this.won = true;
      this.gameState = winningPlayer === ItemState.X ? GameState.X_WON : GameState.O_WON;
    }
    this.updateLocalStorageGameState();
  }

  public updateLocalStorageGameState(): void {
    this.localStorageService.set('gameState', this.gameState);
    this.localStorageService.set('won', this.won);
    this.localStorageService.set('draw', this.draw);
    this.localStorageService.set('boardLines', this.boardLines);
  }

  private setBoardLines(): void {
    let firstLine = this.items[0];
    this.boardLines.push(firstLine);
    let secondLine = this.items[1];
    this.boardLines.push(secondLine);
    let thirdLine = this.items[2];
    this.boardLines.push(thirdLine);
    let firstColumn = [this.items[0][0], this.items[1][0], this.items[2][0]];
    this.boardLines.push(firstColumn);
    let secondColumn = [this.items[0][1], this.items[1][1], this.items[2][1]];
    this.boardLines.push(secondColumn);
    let thirdColumn = [this.items[0][2], this.items[1][2], this.items[2][2]];
    this.boardLines.push(thirdColumn);
    let mainDiagonal = [this.items[0][0], this.items[1][1], this.items[2][2]];
    this.boardLines.push(mainDiagonal);
    let secondaryDiagonal = [this.items[0][2], this.items[1][1], this.items[2][0]];
    this.boardLines.push(secondaryDiagonal);
  }

  isWinning(): ItemState {
    let resultState = ItemState.NOTHING;
    this.boardLines.map((boardLine: BoardItem[]) => {
      if (boardLine[0].state !== ItemState.NOTHING &&
          boardLine[0].state === boardLine[1].state &&
          boardLine[0].state === boardLine[2].state &&
          boardLine[1].state === boardLine[2].state) {
        resultState = boardLine[0].state;
      }
    });
    return resultState;
  }

  isDraw(): boolean {
    for (let i=0; i<3; i++) {
      let state = this.items[i].every((item: BoardItem) => item.state !== ItemState.NOTHING);
      if (!state) return false;
    }
    return true;
  }

  computerMove(): void {
    if (this.gameState !== GameState.O_TURN) {
      return;
    }
    let nextMove;
    for (let i=0; i<3; i++) {
      nextMove = this.items[i].find(item => item.state === ItemState.NOTHING);
      if (nextMove) {
        break;
      }
    }
    nextMove.state = this.getNextState();
    this.updateGameState();
  }
}