import { ROWS,COLS, COLORS, SHAPES, CAR_WIDTH} from '../constants';

export interface IPiece {
  x: number;
  y: number;
  color: string;
  shape: number[][];
}

export class Piece implements IPiece {
  x: number;
  y: number;
  color: string;
  shape: number[][];

  constructor(private ctx: CanvasRenderingContext2D, type:string, coordY:number) {
    var paramType;
    if (type === "player") {
      this.x = CAR_WIDTH-1;
      this.y = coordY;
      paramType = 0;
    } if (type === "enemy") {
      this.x = this.randomizeEnemyPosition(1,2)*CAR_WIDTH-1; //min и max зависят от ширины поля
      this.y = coordY;
      paramType = 1;
    }
      this.shape = SHAPES[paramType];
      this.color = COLORS[paramType];
  }


  draw() {
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillStyle = this.color;
          const currentX = this.x + x;
          const currentY = this.y + y;
          this.ctx.fillRect(currentX, currentY, 1, 1);
        }
      });
    });
  }

  move(p: IPiece) {
    this.x = p.x;
    this.y = p.y;
    this.shape = p.shape;
  }

  randomizeEnemyPosition(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
