import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app/app.component';
import { BoardComponent } from './board/board.component';
import { GameComponent } from './game/game.component';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
