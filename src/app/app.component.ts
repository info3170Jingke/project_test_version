import { CartService } from 'src/app/cart/cart.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { AuthService } from './auth/auth.service';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { firebaseConfig } from './firebase.config';
import { CartItem } from './types/CartItem';
import { Game } from './types/Game';
import { ShoppingCart } from './types/shopping-cart';
import { Observable, Observer, Subscription } from 'rxjs';
//import { CartService } from './cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Final';
  //public cart: Observable<ShoppingCart>;
  //public cartItems: CartItem[];
  //public itemCount: number;
  //private _cartSubscription: Subscription;
  public ttCart: Array<CartItem> = [];
 ttItemCount$: any;

  constructor(
    private authService: AuthService,
    private _cartService: CartService
  ) {
   this._cartService.retrieve();
 //this.ttItemCount = this._cartService.itemCount;
    // console.log(ttCart);
    // this.ttItemCount = ttCart.length;
    //this.cart = this._cartService.get();
    // this.itemCount = 0;
    // this.cartItems.forEach(
    //   item => {
    //     this.itemCount += Number(item.quantity)
    //   }
    // )
    // this._cartSubscription = this.cart.subscribe((cart) =>{
    //   this.itemCount = cart.items
    // .map((x) => x.quantity)
    // .reduce((p, n) => p+n, 0);
    // });
  }

  async ngOnInit(): Promise<void> {
    initializeApp(firebaseConfig);
   await this._cartService.retrieve();
 this.ttItemCount$ =  this._cartService.itemCount;
// this._cartService.retrieve();
    // let ttCart = this._cartService.cart;
    // console.log(ttCart);

    // this.ttItemCount = ttCart.length;
  }



  isAuthenticated() {
    return getAuth().currentUser;
  }

  public ngOnDestroy(): void {
    // if (this._cartSubscription){
    //   this._cartSubscription.unsubscribe();
    // }
  }

  logout() {
    this.authService.logout();
    this._cartService.cart = [];
  }
}
