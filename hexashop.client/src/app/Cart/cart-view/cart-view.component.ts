import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { Icart } from '../../Interfaces/Icart';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.css'
})
export class CartViewComponent implements OnInit {

  constructor(private cartService: CartService) { }

  cartItemsString = localStorage.getItem('cartItems')!;
  cartItems: Icart[] = JSON.parse(this.cartItemsString);

  totalPrice = 0;

  //totalPrice = this.cartService.totalPrice;

  ngOnInit() {
    this.TotalPrice();
  }

  TotalPrice(): void {
    for (let i = 0; i < this.cartItems.length; i++) {
      this.totalPrice += (this.cartItems[i].productOrderQuantity * this.cartItems[i].productPrice)
    }
    this.cartService.totalPrice = this.totalPrice;
  }

  RemoveAnItem(indx: number) {
    this.cartItems.splice(indx, 1);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.totalPrice = 0;
    this.TotalPrice();
  }

  clear() {
    window.alert("Cart will be cleared");
    this.totalPrice = 0;
    this.cartService.clearCart();
    localStorage.removeItem('cartItems');
  }
}
