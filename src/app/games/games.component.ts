import { Component, OnInit } from '@angular/core';
import { Game } from '../types/Game';
import { GamesService } from "./games.service";
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  constructor (private gamesService: GamesService, private cartService: CartService,) {}

  _games: Game[] = [];

  isShowing: boolean = true;

  ngOnInit(): void {
    this._games = this.gamesService.getGames();
    this.cartService.retrieve();
    this.cartService.cart;
  }


}
