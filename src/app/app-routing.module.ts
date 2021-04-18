import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasketComponent } from './basket-operations/basket/basket.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  { path: 'test-error', component: TestErrorComponent, data: { breadcrumb: 'Test Error' } },
  { path: 'server-error', component: ServerErrorComponent, data: { breadcrumb: 'Server Error' } },
  { path: 'not-found', component: NotFoundComponent, data: { breadcrumb: 'Not Found' } },
  { path: 'shop', component: ShopComponent, data: { breadcrumb: 'Shop' } },
  { path: 'shop/:id', component: ProductDetailsComponent, data: { breadcrumb: { alias: 'shopDetail' } } },
  // {path:'basket', loadChildren:()=> import('./basket-operations/basket-operations.module').then((mod)=>mod.BasketOperationsModule),
  //data:{breadcrumb :'Basket'}},
  { path: 'basket', component: BasketComponent, data: { breadcrumb: { alias: 'basket' } } },
  { path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then((mod) => mod.CheckoutModule),
   data: { breadcrumb: 'Checkout' }},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
