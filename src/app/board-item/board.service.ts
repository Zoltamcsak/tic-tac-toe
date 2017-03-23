import {Injectable} from '@angular/core';
import {BoardItem} from './board-item';
import {ItemState} from './item-state';
import {GameState} from '../game/game-state';
@Injectable()
export class MatrixService {
  public items: BoardItem[][] = [];
  public gameState: GameState;
  public boardLines = [];

  public init(): void {
    this.gameState = GameState.X_TURN;
    for (let i=0; i<3; i++) {
      this.items[i] = [];
      for (let j=0; j<3; j++) {
        let item = {state: ItemState.NOTHING};
        this.items[i].push(item);
      }
    }
    this.setBoardLines();
  }

  public updateBoard(item: BoardItem): void {
    item.state = this.gameState === GameState.X_TURN ? ItemState.X : ItemState.O;
    this.updateGameState();
  }

  updateGameState(): void {
    if (this.gameState === GameState.X_TURN) {
      this.gameState = GameState.O_TURN;
    } else {
      this.gameState = GameState.X_TURN;
    }
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


}