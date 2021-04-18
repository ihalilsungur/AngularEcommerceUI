import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket/basket.component';
import { SharedModule } from '../shared/shared.module';
import { BasketOperationsRoutingModule } from './basket-operations-routing.module';





@NgModule({
  declarations: [BasketComponent],
  imports: [
    CommonModule,
    BasketOperationsRoutingModule,
    SharedModule
  ]
})
export class BasketOperationsModule { }
