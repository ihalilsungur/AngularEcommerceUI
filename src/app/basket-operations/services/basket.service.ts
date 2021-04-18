import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/shop/models/product';
import { environment } from 'src/environments/environment';
import { Basket } from '../models/basket';
import { BasketItem } from '../models/basket-item';
import { BasketTotal } from '../models/basket-total';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<Basket>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<BasketTotal>(null);
  basketTotal$ = this.basketTotalSource.asObservable();
  shipping = 0;

  constructor(private http: HttpClient) { }


  createPaymentIntent() {
    return this.http.post(this.baseUrl + 'payments/' + this.getCurrentBasketValue().id, {}).pipe(
      map((basket: Basket) => {
        this.basketSource.next(basket);
        console.log(this.getCurrentBasketValue());
      })
    )
  }

  /*
  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.shipping = deliveryMethod.price;
    const basket= this.getCurrentBasketValue();
    basket.deliveryMethodId = deliveryMethod.id;
    basket.shippingprice = deliveryMethod.price;
    this.calculateTotals();
    this.setBasket(basket);
  }
  */

  getBasket(id: string) {
    return this.http.get(this.baseUrl + 'basket?id=' + id).pipe(
      map((basket: Basket) => {
        this.basketSource.next(basket);
        // this.shipping =basket.shippingprice;
        this.calculateTotals();
      })
    );
  }

  setBasket(basket: Basket) {
    return this.http.post(this.baseUrl + 'basket', basket).subscribe(
      (response: Basket) => {
        this.basketSource.next(response);
        this.calculateTotals();
        if (localStorage.getItem('basket_id') === 'undefined') {
          localStorage.setItem('basket_id', response.id);
        }
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: Product, quantity = 1) {
    const itemToAdd: BasketItem = this.mapProductItemToBasketItem(
      item,
      quantity
    );
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    console.log('addItemToBasket=>', basket);
    basket.basketItems = this.addOrUpdateItem(basket.basketItems, itemToAdd, quantity);
    this.setBasket(basket);
  }

  incrementItemQuantity(item: BasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.basketItems.findIndex((x) => x.id === item.id);
    basket.basketItems[foundItemIndex].quantity++;
    this.setBasket(basket);
  }

  decrementItemQuantity(item: BasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.basketItems.findIndex((x) => x.id === item.id);
    if (basket.basketItems[foundItemIndex].quantity > 1) {
      basket.basketItems[foundItemIndex].quantity--;
    } else {
      this.removeItemFromBasket(item);
    }
  }
  removeItemFromBasket(item: BasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket.basketItems.some((x) => x.id === item.id)) {
      basket.basketItems = basket.basketItems.filter((i) => i.id !== item.id);
      if (basket.basketItems.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket(basket);
      }
    }
  }

  /*
    deleteLocalBasket(id: string) {
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      localStorage.removeItem('basket_id');
    }
  */
  deleteBasket(basket: Basket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe(
      () => {
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem('basket_id');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    const shipping = this.shipping;
    const subTotal = basket.basketItems.reduce((a, b) => b.price * b.quantity + a, 0);
    const total = subTotal + shipping;
    this.basketTotalSource.next({ shipping, total, subTotal });
  }

  private addOrUpdateItem(
    basketItems: BasketItem[],
    itemToAdd: BasketItem,
    quantity: number
  ): BasketItem[] {
    console.log('addOrUpdateItem=>', basketItems);
    const index = basketItems.findIndex((i) => i.id === itemToAdd.id);
    if (index === -1) {
      basketItems.push(itemToAdd);
    } else {
      basketItems[index].quantity += quantity;
    }
    return basketItems;
  }

  private createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapProductItemToBasketItem(
    item: Product,
    quantity: number
  ): BasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType,
    };
  }
}
