import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { OrderTotalsComponent } from './order-totals/order-totals.component';
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';
import { DenemeComponent } from './components/deneme/deneme.component';



@NgModule({
  declarations: [PagingHeaderComponent, PaginationComponent, OrderTotalsComponent, BasketSummaryComponent,
    DenemeComponent],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot()
  ],
  exports: [PaginationModule, PagingHeaderComponent, PaginationComponent, CarouselModule, OrderTotalsComponent,
    BasketSummaryComponent ,DenemeComponent]
})
export class SharedModule {
  constructor() {
    console.log("Shared Module");
  }
}
