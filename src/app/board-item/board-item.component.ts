import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ItemState} from './item-state';
import {BoardItem} from './board-item';
@Component({
  selector: 'app-board-item',
  template: `<div [ngClass]='{"empty-cell": boardItem.state === 0,
                              "filled-x": boardItem.state === 1,
                              "filled-o": boardItem.state === 2,
                              "winning-cell": boardItem.winningCell}'
                class='matrix-item' (click)='onItemClick($event)'>{{itemText}}</div>`,
  styleUrls: ['board-item.scss']
})
export class BoardItemComponent {
  @Input() boardItem: BoardItem;
  @Output() itemClick = new EventEmitter();

  public get itemText(): string {
    if (this.boardItem.state === ItemState.X) {
      return 'X';
    } else if (this.boardItem.state === ItemState.O) {
      return 'O';
    }
  }

  public onItemClick($event): void {
    if (this.boardItem.state === ItemState.NOTHING) {
      this.itemClick.emit($event);
    }
  }
}