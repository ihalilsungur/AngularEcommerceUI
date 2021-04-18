import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket-operations/services/basket.service';
import { Product } from 'src/app/shop/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public product: Product;
  public quantity = 1;
  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute,
    private breabCrumbService: BreadcrumbService, private basketService: BasketService) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {

    //activatedRoute başına '+' koyduğumuzda otomatik olarak convert işlemini yapıyor
    let id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.shopService.getProduct(id).subscribe(result => {
      this.product = result;
      this.breabCrumbService.set('@shopDetail', this.product.name);
    }), error => {
      console.log(error);
    }
  }
  public addItemBasket() {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }
  public incrementItemQuantity() {
    this.quantity++;
  }

  public decrementItemQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }

  }
}
