import { Component, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginService]
})
export class AppComponent {
  title = 'app';
  public identity;
  public token;

  constructor(private _loginService: LoginService) {
    this.identity = this._loginService.getIdentity();
    this.token = this._loginService.getToken()
  }

  ngOnInit() {
    console.log(this._loginService.getToken());
    console.log(this._loginService.getIdentity());
  }
}
