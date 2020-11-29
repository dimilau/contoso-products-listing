import { Injectable } from '@angular/core';
import { Credential } from './credential';

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
  ]

  login(credential: Credential) {
    let credentialFound: Credential = this.users.find(user => user.username === credential.username);
    if (credentialFound && credentialFound.password == credential.password) {
      return true;
    } else {
      return false;
    }
  }
  constructor() { }
}
