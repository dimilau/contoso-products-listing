import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PRODUCTS } from '../mock-products';
import { Product } from '../product';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private userService: UserService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.product = PRODUCTS.find(product => product.id === id);
  }

  onAddToCart() {
    if(this.userService.user){
      this.cartService.addToCart(this.product.id);
    }else{
      this.route.navigate(['login']);
    }
  }

  get user() {
    return this.userService.user;
  }

  get welcomeMessage() {
    return this.user ? `Welcome, ${this.user.username}!`:'';
  }
}
