import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ItemState} from './item-state';
@Component({
  selector: 'app-board-item',
  template: `<div class='matrix-item' (click)='onItemClick($event)'>{{itemText}}</div>`,
  styleUrls: ['board-item.scss']
})
export class BoardItemComponent {
  @Input() state: ItemState;
  @Output() itemClick = new EventEmitter();

  public get itemText(): string {
    if (this.state === ItemState.X) {
      return 'X';
    } else if (this.state === ItemState.O) {
      return 'O';
    }
  }

  public onItemClick($event): void {
    if (this.state === ItemState.NOTHING) {
      this.itemClick.emit($event);
    }
  }
}