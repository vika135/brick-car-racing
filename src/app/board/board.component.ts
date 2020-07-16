import { Component,ViewChild,ElementRef,OnInit,HostListener} from '@angular/core';
import {COLS,BLOCK_SIZE,ROWS,COLORS,KEY,CAR_WIDTH,CAR_HEIGHT,} from '../constants';
import { Piece, IPiece } from '../piece/piece.component';
import { GameComponent } from '../game/game.component';
import { GameService } from '../services/game.service';
//import { Zoundfx } from 'ng-zzfx';

@Component({
  selector: 'game-board',
  templateUrl: './board.component.html'
})
export class BoardComponent implements OnInit {

  @ViewChild('board', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  board: number[][];
  requestId: number;

  game: GameComponent;

  moves = {
    [KEY.LEFT]: (p: IPiece): IPiece => ({ ...p, x: p.x - CAR_WIDTH }),
    [KEY.RIGHT]: (p: IPiece): IPiece => ({ ...p, x: p.x + CAR_WIDTH }),
    [KEY.DOWN]: (p: IPiece): IPiece => ({ ...p, y: p.y + 1 }),
  };

  playSoundFn: Function;
  
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY.ESC) {
      this.newGame();
    }
    if (event.keyCode === KEY.SPACE) {
      event.preventDefault();
      this.game.increaseLevel();
    }
    else if (this.moves[event.keyCode]) {
      event.preventDefault();
      let p = this.moves[event.keyCode](this.game.player);
       if (this.service.valid(p)) {
        this.game.player.move(p);
      }
    }
  }

  constructor(private service: GameService) {}  

  ngOnInit() {
    this.initBoard();
    this.initSound();
    this.game = new GameComponent(this.ctx);
    this.createNewBoard();
    this.game.highScore = Number(localStorage.getItem('highScore'));
    //this.game.highScore = 0;
  }

  initSound() {
    //this.playSoundFn = Zoundfx.start(0.2);
  }

  initBoard() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.canvas.width = COLS * BLOCK_SIZE;
    this.ctx.canvas.height = ROWS * BLOCK_SIZE;
    this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
  }

  play(){
    this.game.play(this); 
  }

  pause(){
    this.game.pause(this); 
  }

  createNewBoard(){
    this.board = this.getEmptyBoard();
    this.addOutlines();
  }

  newGame(){
    this.game.gameOver();

    cancelAnimationFrame(this.requestId);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(1, 3, 8, 1.2);
    this.ctx.font = '1px Arial';
    this.ctx.fillStyle = 'red';
    this.ctx.fillText('GAME OVER', 1.8, 4);
  }

  animate(now = 0) {
    this.game.time.elapsed = now - this.game.time.start;
    if (this.game.time.elapsed > this.game.time.level) {
      this.game.time.start = now;  
     for (let i=0; i < this.game.enemies.length; i++){
      if (!this.game.drop(this.game.enemies[i], this)) {
        this.newGame();
        return;
      }
     }
    }
    this.draw();
    this.requestId = requestAnimationFrame(this.animate.bind(this));
  }

  draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.game.enemies.forEach((enemy) => {
      enemy.draw();
    })
    this.game.player.draw();
    this.drawBoard();
  }

  drawBoard() {
    this.board.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillStyle = COLORS[value];
          this.ctx.fillRect(x, y, 1, 1);
        }
        if (x === 0 || x === COLS-1){
          this.ctx.fillStyle = 'black';
          this.ctx.fillRect(x, y, 1, 1);
        }
      });
    });
    this.addOutlines();
  } 

  getEmptyBoard(): number[][] {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  addOutlines() {
    for(let index = 1; index < COLS; index++) {
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(index, 0, .01, this.ctx.canvas.height);
    }
  
    for(let index = 1; index < ROWS; index++) {
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(0, index, this.ctx.canvas.width, .01);
    }
  }
  
}


 
