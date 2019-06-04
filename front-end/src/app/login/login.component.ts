import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isAuthenticated = false;
  failed = false;

  login: string;
  password: string;

  firstime = true;

  constructor(public loginService: LoginService) {
    this.loginService.authenticatedObs.subscribe((res) => {
      this.isAuthenticated = res;
      console.log('firstime', this.firstime);

      if (this.isAuthenticated && !this.firstime) {
        // TODO on fait quoi ?
        console.log('authentifié');
        this.failed = false;
      } else if (!this.firstime) {
        this.failed = true;
        console.log('rip');
      }
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.firstime = false;
    this.loginService.getAuthenticated(this.login, this.password);
  }

}
