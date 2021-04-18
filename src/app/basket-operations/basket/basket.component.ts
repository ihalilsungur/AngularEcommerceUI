import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Basket } from '../models/basket';
import { BasketItem } from '../models/basket-item';
import { BasketService } from '../services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

 public basket$: Observable<Basket>;
 public basket: Basket;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
  this.basket$ = this.basketService.basket$;
  this.basket$.subscribe(response=>{
    this.basket = response;
    console.log("Subscribe Log ",this.basket);
  });
  }

  removeBasketItem(item:BasketItem){
    this.basketService.removeItemFromBasket(item);
  }

  incrementItemQuantity(item:BasketItem){
    this.basketService.incrementItemQuantity(item);
  }

  decrementItemQuantity(item:BasketItem){
    this.basketService.decrementItemQuantity(item);
  }

}
