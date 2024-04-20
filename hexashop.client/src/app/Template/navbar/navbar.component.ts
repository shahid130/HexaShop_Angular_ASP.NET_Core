import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { AuthenticationService } from '../../Services/authentication.service';
import { Iuser } from '../../Interfaces/Iuser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor(private cartService: CartService, private authService: AuthenticationService) { }

  userInfoString = localStorage.getItem('userObj')!;
  userInfo: Iuser = JSON.parse(this.userInfoString);

  navName = '';


  cartItemsString = localStorage.getItem('cartItems')!;

  ngOnInit() {
    this.cartService.cartItems = JSON.parse(this.cartItemsString);
    if (this.userInfo == null)
      this.navName = '';
    else
      this.navName = this.userInfo.userName;

  }


  scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  

  get totalCartItems(): number{

    if (this.cartService.cartItems == null) {
      return 0;
    }

    return this.cartService.cartItems.length;
  }
}
