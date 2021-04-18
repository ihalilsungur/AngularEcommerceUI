import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from './models/product';
import { ShopParams } from '../shared/models/shop-params';
import { Brand } from './models/brand';
import { Type } from './models/type';
import { ShopService } from './services/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  public products: Product[];
  public brands: Brand[];
  public types: Type[];
  public totalCount: number;
  public shopParams = new ShopParams();
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High yo low', value: 'priceDesc' }
  ];

  @ViewChild('search', { static: true }) search: ElementRef;

  constructor(private shopService: ShopService,
    private _spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(response => {
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, err => {
      console.log(err);
    });
  }

  getBrands() {
    this.shopService.getBrands().subscribe(response => {
      var firstItem = { id: 0, name: 'All' };
      this.brands = [firstItem, ...response];
    }, err => {
      console.log(err);
    })
  }

  getTypes() {
    this.shopService.getTypes().subscribe(response => {
      var firstItem = { id: 0, name: 'All' };
      this.types = [firstItem, ...response];
    }, err => {
      console.log(err);
    })
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event) {
    if (this.shopParams.pageNumber! == event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }

  }

  onSearch() {
    this.shopParams.search = this.search.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onReset() {
    this.search.nativeElement.value = undefined;
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
