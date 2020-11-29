import { Component, OnInit } from '@angular/core';
import { PRODUCTS } from '../mock-products';
import { UserService } from '../user.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products = PRODUCTS;

  constructor(
    private userService: UserService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
  }
  get user() {
    return this.userService.user;
  }

  get welcomeMessage() {
    return this.user ? `Welcome, ${this.user.username}!`:'';
  }

}
