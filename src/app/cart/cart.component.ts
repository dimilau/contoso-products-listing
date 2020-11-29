import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  get cart() {
    return this.cartService.cart;
  }

  get sum() {
    return this.cartService.sum;
  }

  get diagnostic() {
    return JSON.stringify(this.cart);
  }

}
