import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/services/login/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [CookieService]
})
export class LoginComponent implements OnInit {

  isAuthenticated = false;
  failed = false;

  login: string;
  password: string;

  firstime = true;

  constructor(public loginService: LoginService, public cookieService: CookieService, public router: Router) {
    this.loginService.authenticatedObs.subscribe((res) => {
      this.isAuthenticated = res;
      if (this.isAuthenticated && !this.firstime) {
        console.log('authentifié');
        this.failed = false;
        cookieService.set('login', this.loginService.token);
        console.log('token= ',  cookieService.get('login'));
        this.router.navigate(['waiter']);
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
    if (!this.isAuthenticated) {
      this.loginService.getAuthenticated(this.login, this.password);
    }
  }

}
