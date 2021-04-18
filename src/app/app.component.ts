import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket-operations/services/basket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularEcommerceUI';
  constructor(private basketservice: BasketService) { }

  ngOnInit(): void {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketservice.getBasket(basketId).subscribe(() => {
        console.log('Initiliaze basket');
      }, error => {
        console.log(error);
      });
    }
  }
}
