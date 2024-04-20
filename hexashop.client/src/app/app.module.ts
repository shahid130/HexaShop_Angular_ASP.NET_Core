import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Template/navbar/navbar.component';
import { FooterComponent } from './Template/footer/footer.component';
import { CartViewComponent } from './Cart/cart-view/cart-view.component';
import { PlaceOrderComponent } from './Cart/place-order/place-order.component';
import { SuccessfulOrderComponent } from './Cart/successful-order/successful-order.component';
import { HomePageComponent } from './Home/home-page/home-page.component';
import { ProductsComponent } from './Home/products/products.component';
import { SignupComponent } from './Authentication/signup/signup.component';
import { SigninComponent } from './Authentication/signin/signin.component';
import { UserProfileComponent } from './Authentication/user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductsComponent } from './Admin/add-products/add-products.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { SingleProductComponent } from './Home/single-product/single-product.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CartViewComponent,
    PlaceOrderComponent,
    SuccessfulOrderComponent,
    HomePageComponent,
    ProductsComponent,
    SignupComponent,
    SigninComponent,
    UserProfileComponent,
    AddProductsComponent,
    SingleProductComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, ReactiveFormsModule,
    FormsModule, NgxSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
