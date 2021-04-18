import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Basket } from 'src/app/basket-operations/models/basket';
import { BasketService } from 'src/app/basket-operations/services/basket.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public basket$ : Observable<Basket>;
  constructor(private basketService:BasketService) { }

  ngOnInit(): void {
 this.basket$ = this.basketService.basket$;
  }

}
