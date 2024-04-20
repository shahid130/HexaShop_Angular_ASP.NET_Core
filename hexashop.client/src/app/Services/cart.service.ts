import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Icart } from '../Interfaces/Icart';
import { Iproduct } from '../Interfaces/Iproduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl = 'https://localhost:7127';
  http = inject(HttpClient);

  constructor() { }

  cartItems: Icart[] = [];

  singleProduct: Iproduct = {
    productID: 0,
    productName: '',
    productDetails: '',
    productType: '',
    productPrice: 0,
    productImageName: '',
  }
  totalPrice = 0;
  //cartItemsString: string = '';

  addToCart(product: Icart) {
    if (!this.cartItems) {
      this.cartItems = [];
    }
    this.cartItems.push(product);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    return this.cartItems;
  }
}
