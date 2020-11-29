import { Component, OnInit } from '@angular/core';
import { Credential } from '../credential';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }
  credential: Credential = new Credential('','');
  testResult;
  onSubmit() {
    this.testResult = this.userService.login(this.credential);
    if (this.testResult) {
      this.router.navigate(['products']);
    }
  }
  get diagnostic() { return JSON.stringify(this.credential);}

}