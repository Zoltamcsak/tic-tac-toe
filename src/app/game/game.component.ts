import {Component, OnInit} from '@angular/core';
import {BoardItem} from '../board-item/board-item';
import {MatrixService} from '../board-item/board.service';
@Component({
  selector: 'app-game',
  template: `
      <div class='item-row' *ngFor='let row of this.matrixService.items'>
          <app-board-item *ngFor='let col of row' [state]='col.state' (itemClick)='onItemClick(col)'></app-board-item>
      </div>`,
  styleUrls: ['game.scss']
})
export class GameComponent implements OnInit {
  nrOfRows: number;
  constructor(public matrixService: MatrixService) {}

  ngOnInit(): void {
    this.matrixService.init();
  }

  onItemClick(item: BoardItem): void {
    this.matrixService.updateBoard(item);
  }
}