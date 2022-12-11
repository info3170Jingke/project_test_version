import { GamesService } from './../games/games.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Game } from '../types/Game';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../types/CartItem';


//import { CartItem } from '../types/CartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public itemsToDisplay:any[] = [];
  public itemToDisplay = {
    itemId:"",
    itemName: "",
    quantity: 0,
  };
  constructor(private cartService: CartService, private gamesService:GamesService) {}

  async ngOnInit(): Promise<void> {
    // this.cartService.retrieve();
    // let cart = this.cartService.cart;
    let cart = this.cartService.retrieve();

    let games = this.gamesService.getGames()
    console.log(cart);
    (await cart).forEach((i) => {
      let itemToDisplay = {
        itemId:"",
        itemName: "",
        quantity: 0,
      };
      itemToDisplay.itemId = i.itemId;
      itemToDisplay.quantity = i.quantity;
      itemToDisplay.itemName =  games.find((g)=>g.id==i.itemId)?.name as string;
      
      this.itemsToDisplay.push(itemToDisplay)
    });
    console.log(this.itemsToDisplay);
    
  }

  remove(i: number) {
    console.log(this.itemsToDisplay[i].itemId);
    
    this.cartService.remove(this.itemsToDisplay[i].itemId);
    
  }
}
