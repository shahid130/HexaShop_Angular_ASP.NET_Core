import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { Iproduct } from '../../Interfaces/Iproduct';
import { Icart } from '../../Interfaces/Icart';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent {

  constructor(private cartService: CartService) { }

  singleProduct = this.cartService.singleProduct;

  selectedColor: string = '#ff0000';
  selectedSize= 'L';
  quantity = 1;
  stock = "In Stock";

  ArrayOfSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  colors: string[] = ['#ff0000', '#0000ff', '#00ff00', '#ffff00'];
  

  AddToCart(product: Iproduct) {
    const cartProduct: Icart = {
      productID: product.productID,
      productName: product.productName,
      productPrice: product.productPrice,
      productOrderQuantity: this.quantity,
      productColor: this.selectedColor,
      productSize: this.selectedSize,
      productImageName: product.productImageName
    }
    this.cartService.addToCart(cartProduct);
  }

  decrease(product: Iproduct) {
    if (this.quantity > 1) {
      this.quantity--;
      this.cartService.totalPrice -= product.productPrice;
    }
  }
  increase(product: Iproduct) {

    if (this.quantity < 15) {
      this.quantity++;
      this.cartService.totalPrice += product.productPrice;
    }
  }

  SelectSize(size:string) : void {
    this.selectedSize = size;
  }

  selectColor(color: string): void {
    this.selectedColor = color;
  }
}
