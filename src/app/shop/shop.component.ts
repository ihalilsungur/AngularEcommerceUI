import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
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
  public totalCount:number;
  public showParams = new ShopParams();
  sortOptions=[
    {name:'Alphabetical',value:'name'},
    {name:'Price: Low to High',value:'priceAsc'},
    {name:'Price: High yo low',value:'priceDesc' }
  ];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.showParams).subscribe(response => {
      this.products = response.data;
      this.showParams.pageNumber=response.pageIndex;
      this.showParams.pageSize=response.pageSize;
      this.totalCount = response.count;
    }, err => {
      console.log(err);
    });
  }

  getBrands() {
    this.shopService.getBrands().subscribe(response => {
      var firstItem ={id:0,name:'All'};
      this.brands = [firstItem, ...response ];
    }, err => {
      console.log(err);
    })
  }

  getTypes() {
    this.shopService.getTypes().subscribe(response => {
      var firstItem ={id:0,name:'All'};
      this.types = [firstItem, ...response ];
    }, err => {
      console.log(err);
    })
  }

  onBrandSelected(brandId: number) {
    this.showParams.brandId = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.showParams.typeId = typeId;
    this.getProducts();
  }
  onSortSelected(sort:string){
    this.showParams.sort =sort;
    this.getProducts();
  }

}
