import { Component, OnInit, OnDestroy } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { AuthService } from "./auth/auth.service";
import { firebaseConfig } from './firebase.config';
import { CartItem } from './types/CartItem';
import { Game } from './types/Game';
import { ShoppingCart } from './types/shopping-cart';
import { Observable, Observer, Subscription } from 'rxjs';
import { CartService } from './cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Final';

  public cart: Observable<ShoppingCart>;
  public cartItems: CartItem[];
  public itemCount: number;
  private _cartSubscription: Subscription;


  constructor(private authService: AuthService, private _cartService: CartService) {

    this.cart = this._cartService.get(); 
    // this._cartService.retrieve();
    this.cartItems = this._cartService.cart;
    this.itemCount = 0;
    this.cartItems.forEach(
      item => {
        this.itemCount += Number(item.quantity)
      }
    )
    console.log(this.itemCount);
    this._cartSubscription = this.cart.subscribe((cart) =>{
      this.itemCount = cart.items
    .map((x) => x.quantity)
    .reduce((p, n) => p+n, 0);
    });
  }

  ngOnInit(): void {
    initializeApp(firebaseConfig);
  }
  

  isAuthenticated() {
    return this.authService.isAuthenticated;
  }

  public ngOnDestroy(): void {
    if (this._cartSubscription){
      this._cartSubscription.unsubscribe();
    }
      
  }

  logout() {
    this.authService.logout();
    this._cartService.cart = [];
  }
}
