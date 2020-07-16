import { Component, OnInit } from '@angular/core';
import { Piece} from '../piece/piece.component';
import {  ROWS, LEVEL, POINTS_PER_LEVEL, CAR_HEIGHT, CAR_WIDTH,KEY } from '../constants';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {

  public enemies: Piece[];//
  public player: Piece;//
  public paused: boolean; //
  public gameStarted: boolean; //
  public time: { start: number; elapsed: number; level: number }; //
  public highScore: number; 
  public level: number; //
  public points: number; //

  constructor(ctx: CanvasRenderingContext2D) { 
    this.highScore = 0;
    this.createCars(ctx);
  }
  
  ngOnInit(): void {
  }

  play(that: any) {
    this.gameStarted = true;
    this.resetGame(that);
    this.createCars(that.ctx);
    that.createNewBoard();

    this.time.start = performance.now();
    if (that.requestId) {
      cancelAnimationFrame(that.requestId);
    }
    that.animate();
  }

  createCars(ctx: CanvasRenderingContext2D){
    this.player = new Piece(ctx, "player", ROWS-CAR_HEIGHT);    //игрок
    this.enemies = new Array(3);  //максимально на экране может быть 4 машинки, включая игрока, чтобы можно было объехать их

    //создаем машинки таким образом, чтобы между ними было не менее 4 клеток по вертикали (чтобы можно было объехать их)
    this.enemies[0] = new Piece(ctx, "enemy", 0);  
    for (var i = 1; i < this.enemies.length; 
      this.enemies[i++] = new Piece(ctx, "enemy", this.enemies[i-2].y-CAR_HEIGHT*2));
  }

  resetGame(that: any) {
    this.points = 0;
    this.level = 0;
    that.createNewBoard();
    this.time = { start: 0, elapsed: 0, level: LEVEL[this.level] };
    this.paused = false;  
  }

  drop(piece: Piece, that: any): boolean {
    let p = that.moves[KEY.DOWN](piece);
    //вниз
    if (that.service.valid(p)) {
      piece.move(p);
    }
    //если машинка достигла конца экрана, вернуть наверх
    if (piece.y ===  ROWS-1) {
      this.points++;
      if (this.checkLevel()) this.increaseLevel();
      piece.y = -CAR_HEIGHT-1;
      piece.x = piece.randomizeEnemyPosition(1,2)*CAR_WIDTH-1;
    }
    //столкновение
    if (piece.y+CAR_HEIGHT-1 >= this.player.y && piece.x === this.player.x){
      return false;
    }   
    return true;
  }

  gameOver() {
    this.gameStarted = false;
    this.highScore = this.points > this.highScore ? this.points : this.highScore;
    localStorage.setItem('highScore', this.highScore.toString());
  }

  checkLevel(): boolean{
    if (this.points % POINTS_PER_LEVEL === 0 && this.points != 0 && this.level !== 8)
      return true;
    else return false;
  }

  increaseLevel(){
    if (this.level !== 8)
      this.level++;
      this.time.level = LEVEL[this.level];
  }

  pause(that: any) {
    if (this.gameStarted) {
      if (this.paused) {
        that.animate(); 
      } else {
        that.ctx.font = '1px Arial';
        that.ctx.fillStyle = 'black';
        that.ctx.fillText('GAME PAUSED', 1.4, 4);
        cancelAnimationFrame(that.requestId); 
      }
      this.paused = !this.paused;
    }
  }

}
