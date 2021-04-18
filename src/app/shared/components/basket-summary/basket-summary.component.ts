import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Basket } from 'src/app/basket-operations/models/basket';
import { BasketItem } from 'src/app/basket-operations/models/basket-item';
import { BasketService } from 'src/app/basket-operations/services/basket.service';


@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.css']
})
export class BasketSummaryComponent implements OnInit {
 public basket$ :Observable<Basket>;
 public basket :Basket;
 @Output() decrement:EventEmitter<BasketItem> = new EventEmitter<BasketItem>();
 @Output() increment:EventEmitter<BasketItem> = new EventEmitter<BasketItem>();
 @Output() remove : EventEmitter<BasketItem> = new EventEmitter<BasketItem>();
 @Input () isBasket = true;

  constructor(private basketService :BasketService) { }

  ngOnInit(): void {
    this.basket$= this.basketService.basket$;
    this.basket$.subscribe(response =>{
      this.basket=response;
    });
  }

  decrementItemQuantity(item:BasketItem){
    this.decrement.emit(item);
  }
  incrementItemQuantity(item:BasketItem){
    this.increment.emit(item);
  }
  removeBasketItem(item:BasketItem){
    this.remove.emit(item);
  }
}
