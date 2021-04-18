import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketTotal } from 'src/app/basket-operations/models/basket-total';
import { BasketService } from 'src/app/basket-operations/services/basket.service';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.css']
})
export class OrderTotalsComponent implements OnInit {

  public basketTotal$ : Observable<BasketTotal>;
  public basketTotal :BasketTotal;

  constructor(private basketService:BasketService) { }

  ngOnInit(): void {
    this.basketTotal$ = this.basketService.basketTotal$;
    this.basketTotal$.subscribe(response =>{
      this.basketTotal = response;
    });
  }

}
