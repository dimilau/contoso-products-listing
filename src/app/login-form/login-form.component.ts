import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  credential: Credential = new Credential('','');
  onSubmit() {
    return true;
  }
  get diagnostic() { return JSON.stringify(this.credential);}

}

class Credential {
  constructor(
    public username: string,
    public password: string
  ) { }
}