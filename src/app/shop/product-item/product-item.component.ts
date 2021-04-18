import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket-operations/services/basket.service';
import { Product } from 'src/app/shop/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product :Product;
  constructor( private basketService:BasketService) { }

  ngOnInit(): void {
  }

  public addItemToBasket(){
    this.basketService.addItemToBasket(this.product);
  }
}
