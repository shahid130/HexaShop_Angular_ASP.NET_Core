import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../Interfaces/Iproduct';
import { HomeService } from '../../Services/home.service';
import { Router } from '@angular/router';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{

  public mensProducts: Iproduct[] = [];
  public womensProducts: Iproduct[] = [];
  public kidsProducts: Iproduct[] = [];


  currentPage = 1;
  productInOnePage = 3;




  constructor(private homeService: HomeService,
    private router: Router, private cartService: CartService) { }

  ngOnInit() {
    this.getMensProducts();
    this.getWomensProducts();
    this.getKidsProducts();
  }

  getMensProducts(): void {
    this.homeService.getTypesOfProducts(6, '2')
      .subscribe(response => {
        this.mensProducts = response;
      });
  }
  getWomensProducts(): void {
    this.homeService.getTypesOfProducts(6, '3')
      .subscribe(response => {
        this.womensProducts = response;
      });
  }
  getKidsProducts(): void {
    this.homeService.getTypesOfProducts(6, '4')
      .subscribe(response => {
        this.kidsProducts = response;
      });
  }
  /*
  getProducts(): void {
    this.homeService.getProducts(this.productInOnePage, this.type)
      .subscribe(response => {
        this.Products = response.products;
        this.totalProducts = response.totalProducts;
        this.totalPages = Math.ceil(this.totalProducts / this.productInOnePage);
        if (this.totalPages < 3) {

          this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
          console.log("Total Pages  ok: " + this.totalPagesArray);
        }
        else
          this.totalPagesArray = Array(3).fill(0).map((x, i) => i + 1);
      });
  }*/

  SingleProduct(product: Iproduct) {
    this.cartService.singleProduct = product;
  }

}
