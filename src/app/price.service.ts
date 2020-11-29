import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  rules;
  discountTypes;
  constructor() {
    this.rules = {
      'diamond': {
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
      },
      'platinum': {
        'kon4': function rules (count, price) {
          return count >= 5 ? count * 2888.99 : count * price;
        },
        'iro8': function rules (count, price) {
          return count * 3000;
        },
        'iro17': function rules (count, price) {
          return Math.floor(count/5) * (price * 4) + (count % 5 * price);
        },
        'default': function rules (count, price) {
          return count * price * 0.85;
        },
      },
      'associate': {
        'san10': function rules (count, price) {
          return Math.floor(count/3) * (price * 2) + (count % 3 * price)
        },
        'default': function rules (count, price) {
          return count * price * 0.95;
        },
      }
    };
    this.discountTypes = {
      'diamond': {
        'kon4': 'Discount: Order 3 or more, get RM2588.99/unit',
        'iro8': 'Discount: RM2500/unit',
        'iro17': '3 for 2 deal',
        'default': '20% Discount'
      },
      'platinum': {
        'kon4': 'Discount: Order 5 or more, get 2888.99/unit',
        'iro8': 'Discount: 3000/unit',
        'iro17': '5 for 4 deal',
        'default': '15% Discount'
      },
      'associate': {
        'san10': '3 for 2 deal',
        'default': '5% Discount'
      },
    }
  }
}

/*
kon4 x1=3488.99
iro17 x4=2119.96
fox11 x1=56.1
shi20 x1=57.46
*/
