import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor() { }
  @Output() event = new EventEmitter();

  getGames() {
    return [
      {
        id:"1",
        name : 'Marvel\'s Spider-Man: Miles Morales',
        price : 64.99,
        image : 'https://m.media-amazon.com/images/I/819ANa02MqL._AC_SL1500_.jpg'
      },
      {
        id:"2",
        name: 'Ghost of Tsushima Director\'s Cut',
        price: 89.99,
        image: 'https://m.media-amazon.com/images/I/81m3+1vnPBS._AC_SL1500_.jpg'
      },
      {
        id:"3",
        name: 'The Callisto Protocol Day One Edition',
        price: 89.99,
        image: 'https://m.media-amazon.com/images/I/81naEHi744L._AC_SL1500_.jpg'
      },
      {
        id:"4",
        name: 'Star Wars Jedi Fallen Order',
        price: 89.99,
        image: 'https://m.media-amazon.com/images/I/61wC-yZd4bS._AC_SL1180_.jpg'
      }
    ]
  }
}
