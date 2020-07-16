import { Injectable } from '@angular/core';
import { IPiece } from '../piece/piece.component';
import { COLS, ROWS, PADDING } from '../constants';
//import { BoardComponent } from './board/board.component';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  //board: BoardComponent;

  valid(p: IPiece): boolean {
    return p.shape.every((row, dy) => {
      return row.every((value, dx) => {
        let x = p.x + dx;
        let y = p.y + dy;
        return (
          this.isEmpty(value) || (this.insideWalls(x))
        );
      });
    });
  }

  isEmpty(value: number): boolean {
    return value === 0;
  }

  insideWalls(x: number): boolean {
    return x >= PADDING && x < COLS - PADDING;
  }
}
