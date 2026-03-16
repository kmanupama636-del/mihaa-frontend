import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';

const routes: Routes = [

{ path: '', component: HomeComponent },

{ path: 'products', component: ProductsComponent },

{ path: 'product-details/:id', component: ProductDetailsComponent },

{ path: 'login', component: LoginComponent },

{ path: 'signup', component: SignupComponent },

{ path: 'wishlist', component: WishlistComponent },

{ path: 'cart', component: CartComponent },

{ path: 'orders', component: OrdersComponent }

];

@NgModule({
imports: [RouterModule.forRoot(routes,{anchorScrolling:'enabled',scrollPositionRestoration:'enabled'})],
exports: [RouterModule]
})
export class AppRoutingModule {}


