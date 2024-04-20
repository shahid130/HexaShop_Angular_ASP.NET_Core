import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../Services/home.service';
import { Router } from '@angular/router';
import { Iproduct } from '../../Interfaces/Iproduct';
import { CartService } from '../../Services/cart.service';
import { Icart } from '../../Interfaces/Icart';
import { Options } from '@angular-slider/ngx-slider';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  public Products: Iproduct[] = [];


  currentPage = 1;
  productInOnePage =3;
  type = "1";


  minPrice = 0;
  maxPrice = 10000;
  options: Options = {
    floor: 0,
    ceil: 10000,
  };
  
  totalProducts = 0;
  totalPages = 0;
  totalPagesArray: number[] = [];
  remainigPages = 0;
  constructor(private homeService: HomeService,
    private router: Router, private cartService: CartService ) { }

  ngOnInit() {
    //this.NumberOfProducts();
    this.getProducts();
  }

  getProducts(): void {
    this.homeService.getProducts(this.currentPage, this.productInOnePage, this.minPrice, this.maxPrice, this.type)
      .subscribe(response => {
        this.Products = response.products;
        this.totalProducts = response.totalProducts;
        this.totalPages = Math.ceil( this.totalProducts / this.productInOnePage);
        if (this.totalPages < 3) {

          this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
          console.log("Total Pages  ok: " + this.totalPagesArray);
        }
        else
          this.totalPagesArray = Array(3).fill(0).map((x, i) => i + 1);
      });
  }

   /* NumberOfProducts(): void {
    this.homeService.getNumberOfProducts()
      .subscribe(response => {
        this.totalProducts = response;
        this.totalPages = this.totalProducts / this.productInOnePage;
        if (this.totalPages < 3) {

          this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
        }
        else
          this.totalPagesArray = Array(3).fill(0).map((x, i) => i + 1);

      });
    
  }*/

  onForwardPageChange(pageNumber: number): void {
    if (pageNumber <= this.totalPages) {
      this.currentPage++;
      var indxOnevalue = this.totalPagesArray[1];
      if (this.totalPages > this.totalPagesArray[2] && this.totalPagesArray.length>3)
        this.totalPagesArray = Array(3).fill(0).map((x, i) => i + indxOnevalue);
      this.getProducts();
    }
  }
  onPageChange(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.getProducts();
    }
  }
  onBackwardPageChange(pageNumber: number): void {
    if (pageNumber >= 1) {
      this.currentPage--;
      var indxZeroValue = Math.max(1, (this.totalPagesArray[0] - 1));
      if (this.totalPagesArray.length > 3)
      this.totalPagesArray = Array(3).fill(0).map((x, i) => i + indxZeroValue);
      this.getProducts();
    }
  }

  SingleProduct(product: Iproduct) {
    this.cartService.singleProduct = product;
  }

  SelectCategory(productType: string): void {
    if (productType === this.type) {
      this.type = '1';
    }
    else
      this.type = productType;
  }

}
