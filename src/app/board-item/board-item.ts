import {ItemState} from './item-state';
export interface BoardItem {
    state: ItemState;
    winningCell: boolean;
}