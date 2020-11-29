import { Injectable } from '@angular/core';
import { PRODUCTS } from './mock-products';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  rules;

  constructor() { 

    this.rules = {
        'kon4': function rules (count, price) {
            return count >= 3 ? count * 2588.99 : count * price;
        },
        'iro8': function rules (count, price) {
            return count * 2500;
        },
        'iro17': function rules (count, price) {
            return Math.floor(count/3) * (price * 2) + (count % 3 * price)
        },
        'default': function rules (count, price) {
            return count * price * 0.8;
        }   
    };
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
    let cart= JSON.parse(localStorage.getItem('cart')||'[]');
    let cartLineItems: ICartLineItem[] = cart.map(function(cartLineItem: ICartLineItem){
      let productDetail = PRODUCTS.find(product => product.id === cartLineItem.id);
      return {...cartLineItem, ...productDetail};
    });
    return cartLineItems;
  }

  get sum() {
    let sum = this.cart.reduce(function (total, cartLineItem) {
      let selectedRule = this.rules[cartLineItem.sku] ? this.rules[cartLineItem.sku] : this.rules['default'];
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
}