import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from 'src/app/shared/models/pagination';
import { Brand } from '../models/brand';
import { Type } from '../models/type';
import { map } from 'rxjs/operators';
import { ShopParams } from 'src/app/shared/models/shop-params';
import { Product } from 'src/app/shop/models/product';
@Injectable()
export class ShopService {

  public baseUrl = "https://localhost:44306/api/";
  constructor(private httpClient: HttpClient) { }

  getProducts(shopParams?:ShopParams) {
    let params = new HttpParams();
    if (shopParams.brandId !==0) {
      params = params.append('brandId', shopParams.brandId.toString())
    }
    if (shopParams.typeId !==0) {
      params = params.append('typeId', shopParams.typeId.toString());
    }

    if (shopParams.search) {
      params = params.append('search',shopParams.search);
    }
     params = params.append('sort',shopParams.sort);
     params = params.append('pageIndex',shopParams.pageNumber.toString());
     params = params.append('pageIndex',shopParams.pageSize.toString());

    return this.httpClient.get<Pagination>(this.baseUrl + 'Products', { observe: 'response', params })
      .pipe(map(response => {
        return response.body;
      }));
  }

  getProduct(id:number){
    return this.httpClient.get<Product>(this.baseUrl+'products/'+id);
  }

  getBrands() {
    return this.httpClient.get<Brand[]>(this.baseUrl + 'products/brands');
  }
  getTypes() {
    return this.httpClient.get<Type[]>(this.baseUrl + 'products/types');
  }
}
