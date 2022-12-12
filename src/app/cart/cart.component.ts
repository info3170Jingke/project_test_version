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
  cart: Array<CartItem> = [];
item: any;
  constructor(private cartService: CartService, private gamesService:GamesService) {

  }

  async ngOnInit(): Promise<void> {
    await this.cartService.retrieve();
    this.cart = this.cartService.cart;
    //this.cart = this.cartService.retrieve();
    this.itemsToDisplay = [];
    let games = this.gamesService.getGames();
    //console.log(cart);
    (await this.cart).forEach((i) => {
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
   // console.log(this.itemsToDisplay);
    
  }

  async remove(i: number) {
    //console.log(this.itemsToDisplay[i].itemId);
    
   await this.cartService.remove(this.itemsToDisplay[i].itemId);
    
   await this.cartService.retrieve();
    this.cart = this.cartService.cart;
    //this.cart = this.cartService.retrieve();

    let games = this.gamesService.getGames();
    this.itemsToDisplay = [];
    (await this.cart).forEach((i) => {
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
    //console.log(this.itemsToDisplay);

}}
