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

  constructor(public loginService: LoginService) {
    this.loginService.authenticatedObs.subscribe((res) => {
      this.isAuthenticated = res;
      if (this.isAuthenticated) {
        // TODO on fait quoi ?
        console.log('authentifié');
        this.failed = false;
      } else {
        console.log('rip');
      }
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.loginService.getAuthenticated(this.login, this.password);
    if(!this.isAuthenticated){
      this.failed = true;
    }
  }

}
