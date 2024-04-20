import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './Authentication/signup/signup.component';
import { SigninComponent } from './Authentication/signin/signin.component';
import { HomePageComponent } from './Home/home-page/home-page.component';
import { ProductsComponent } from './Home/products/products.component';
import { CartViewComponent } from './Cart/cart-view/cart-view.component';
import { PlaceOrderComponent } from './Cart/place-order/place-order.component';
import { SuccessfulOrderComponent } from './Cart/successful-order/successful-order.component';
import { AddProductsComponent } from './Admin/add-products/add-products.component';
import { UserProfileComponent } from './Authentication/user-profile/user-profile.component';
import { AuthGuardService } from './Services/auth-guard.service';
import { SingleProductComponent } from './Home/single-product/single-product.component';

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent},
  { path: 'userprofile', component: UserProfileComponent, canActivate: [AuthGuardService] },
  { path: 'homepage', component: HomePageComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cartview', component: CartViewComponent },
  { path: 'placeorder', component: PlaceOrderComponent },
  { path: 'successfulorder', component: SuccessfulOrderComponent },
  { path: 'add', component: AddProductsComponent },
  { path: 'singleproduct', component: SingleProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
