import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesService } from "./games.service";
import { GamesComponent } from "./games.component";
import { GameComponent } from "./game/game.component";


@NgModule({
  declarations: [GamesComponent, GameComponent],
  providers: [GamesService],
  imports: [CommonModule],
  exports: [GamesComponent]
})
export class GamesModule { }
