import { Component, OnInit } from '@angular/core';
import { Authenticator } from './authentication.service';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authenticator: Authenticator) {

  }

  login(): void {
    this.authenticator.login(this.username, this.password);
  }
}
