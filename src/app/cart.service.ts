import { Injectable } from '@angular/core';
import { PRODUCTS } from './mock-products';
import { PriceService } from './price.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private userService:UserService,
    private priceService:PriceService
  ) { 
  }

  addToCart(id: number) {
    let cart = JSON.parse(localStorage.getItem('cart')||'[]');
    let index = cart.findIndex((cartLineItem) => cartLineItem.id == id);
    if (~index) {
      cart[index].quantity += 1;
    } else {
      cart.push({id: id, quantity: 1});
    }
    localStorage.setItem('cart',JSON.stringify(cart));
  }

  get cart() {
    let userType = this.userService.user.type;
    let rules = this.priceService.rules[userType];
    let discountTypes = this.priceService.discountTypes[userType];

    let cart= JSON.parse(localStorage.getItem('cart')||'[]');
    let cartLineItems: ICartLineItem[] = cart.map(function(cartLineItem: ICartLineItem){
      let productDetail = PRODUCTS.find(product => product.id === cartLineItem.id);
      let selectedRule = rules[productDetail.sku] ? rules[productDetail.sku] : rules['default'];
      let discountType = discountTypes[productDetail.sku] ? discountTypes[productDetail.sku] : discountTypes['default'];
      let subTotal = selectedRule(cartLineItem.quantity, productDetail.price);
      return {...cartLineItem, ...productDetail, subTotal, discountType};
    });
    return cartLineItems;
  }

  get cartCount() {
    let cart= JSON.parse(localStorage.getItem('cart')||'[]');
    return cart.reduce(function(acc, cartLineItem){
      return acc + cartLineItem.quantity;
    },0);
  }

  get sum() {
    let userType = this.userService.user.type;
    let rules = this.priceService.rules[userType];

    let sum = this.cart.reduce(function (total, cartLineItem) {
      let selectedRule = rules[cartLineItem.sku] ? rules[cartLineItem.sku] : rules['default'];
      let sumItem = selectedRule(cartLineItem.quantity, cartLineItem.price);
      return total + Math.round(sumItem * 100) / 100;
    }.bind(this), 0);
    return sum;
  }
}

interface ICartLineItem {
  id: number;
  quantity: number;
  name?: string;
  price?: number;
  sku?: string;
  subTotal?: number;
  discountType?: string;
}