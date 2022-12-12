import { CartItem } from './../types/CartItem';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { Injectable } from '@angular/core';
import { Game } from '../types/Game';
import { Observable, Observer } from 'rxjs';
import { ShoppingCart } from '../types/shopping-cart';
import { GamesService } from '../games/games.service';
import { FormsModule } from '@angular/forms';

import {
  getFirestore,
  collection,
  updateDoc,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  setDoc,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: Array<CartItem> = [];
  itemCount = 0;
  private _subscriptionObservable: Observable<ShoppingCart>;
  private _subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();
  private _products: Game[] = [];
  someSubscription: any;


  
  constructor(private _gamesService: GamesService) {
    this._products = this._gamesService.getGames();
    this._subscriptionObservable = new Observable<ShoppingCart>(
      (observer: Observer<ShoppingCart>) =>{
        this._subscribers.push(observer);
        observer.next(this.retrieveCart());
        return () =>{
          this._subscribers = this._subscribers.filter(
            (obs) => obs != observer
          );
        };
      }
    );
  }

  public get():Observable<ShoppingCart> {
    return this._subscriptionObservable;
  }

  public addItem(product: Game, quantity: number): void {
    const cart = this.retrieveCart();
    let item = cart.items.find((p) => p.itemId === product.id);
    if (item === undefined){
      item = new CartItem();
      item.itemId = product.id;
      cart.items.push(item);
    }
    item.quantity += quantity;
    cart.items = cart.items.filter((CartItem) => CartItem.quantity >0);
    
    this.dispatch(cart)
  }
   
  async getBadge(): Promise<void> {
    this.itemCount = this.cart.map((x) => x.quantity).reduce((p, n) => p + n, 0);
    console.log(this.itemCount);
    
  } 
  // private calculateCart(cart: ShoppingCart):void {
  //   cart.itemsTotal = cart.items
  //   .map(
  //     (e) =>
  //     e.quantity * this._products.find((p) => p.id == e.itemId).price
  //   )
  //   .reduce((previous, current)=> previous +current, 0);
  // }

  private retrieveCart(): ShoppingCart{
    const cart = new ShoppingCart();
    return cart;
  }

  private dispatch(cart:ShoppingCart):void {
    this._subscribers.forEach((sub)=>{
      try {
        sub.next(cart);
      } catch (e){

      }
    });
  }

  public async addToFirestore(game: Game) {
    let cart = this.cart;
    const db = getFirestore();
    const userId: string | undefined = getAuth().currentUser?.uid;
    console.log(`user ID: ${userId}`);
    // if item not in cart, create one
    let item = cart.find((i) => i.itemId === game.id);
    if (item === undefined) {
      item = {
        itemId: game.id,
        quantity: 1,
      };
      cart.push(item);
    } else {
      cart[cart.indexOf(item)].quantity++; // if item in cart, qty + 1
    }

    // write to firestore

    await setDoc(doc(db, 'carts', userId as string), {
      cart: cart,
      userId: userId,
    });

    await this.getBadge()
  }

  public async remove(itemId: string) {
    let cart = this.cart;
    const db = getFirestore();
    const userId: string | undefined = getAuth().currentUser?.uid;

    cart.forEach(
      item => {
        if(item.itemId === itemId){
          if(item.quantity > 1){
            item.quantity -= 1;
          }
          else{
            cart = cart.filter((g)=>g.itemId!=itemId)
          }
        }
      }
    )

    await setDoc(doc(db, 'carts', userId as string), {
      cart: cart,
      userId: userId,
    });

    await this.retrieve();

    await this.getBadge()

    
  }

  public async retrieve() {
    //console.log('retrieve from firestore');
    let data: Array<CartItem> = [];
    const db = getFirestore();
    const userId: string | undefined = getAuth().currentUser?.uid;

    const querySnapshot = await getDocs(collection(db, 'carts'));
    querySnapshot.forEach((doc) => {
      if (doc.id == userId) {

        data = doc.data()['cart'];

        this.cart = data;
        //console.log(this.cart);

      }
    });
    await this.getBadge()

    return data;
  }
}
