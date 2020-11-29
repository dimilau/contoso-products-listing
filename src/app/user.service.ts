import { Injectable } from '@angular/core';
import { Credential } from './credential';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  users = [
    {
      username: 'john',
      password: '123456',
      type: 'diamond'
    },
    {
      username: 'jane',
      password: '123456',
      type: 'platinum'
    },
    {
      username: 'jerry',
      password: '123456',
      type: 'associate'
    }
  ];

  constructor(
    private router: Router
  ) { }

  login(credentialGiven: Credential) {
    let credentialFound: Credential = this.users.find(user => user.username === credentialGiven.username);
    if (credentialFound && credentialFound.password == credentialGiven.password) {
      this.postLogin(credentialFound);
      return true;
    } else {
      return false;
    }
  }

  postLogin(credentialFound) {
    let userDetail = {username: credentialFound.username, type: credentialFound.type};
    localStorage.setItem('user', JSON.stringify(userDetail))
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    this.router.navigate(['login']);
  }

  get user() {
    return JSON.parse(localStorage.getItem('user'));
  }
}