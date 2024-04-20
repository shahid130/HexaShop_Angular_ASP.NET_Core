import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { AuthenticationService } from '../../Services/authentication.service';
import { Router } from '@angular/router';
import { Icart } from '../../Interfaces/Icart';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.css'
})
export class PlaceOrderComponent implements OnInit {

  orderItems: Icart[] = [];
  totalPrice = 0;
  constructor(private cartService: CartService, private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.authService.setPreviousUrl(this.router.url);
      this.router.navigate(['/signin']);
    }
    else {
      this.orderItems = this.cartService.getCartItems();
      this.totalPrice = this.cartService.totalPrice;
    }
      
  }

  clear() {
    this.totalPrice = 0;
    this.cartService.clearCart();
  }
}
