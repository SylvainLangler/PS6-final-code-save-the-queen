import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import io from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token;
  id;


  isInit = false;

  loginURL = '';
  route = '/admin/connect';

  authenticated = false;
  authenticatedObs: BehaviorSubject<boolean> = new BehaviorSubject(this.authenticated);

  socket;
  orchIp;

  port = ':1881';

  initObs: BehaviorSubject<boolean> = new BehaviorSubject(this.isInit);

  constructor(private http: HttpClient, public cookieService: CookieService) {

    this.socket = io('http://' + '192.168.43.58' + this.port, {
      query: {
        id: this.cookieService.get('id')
      }
    });

    this.socket.on('create', (data) => {
      console.log('data:', data);
    });

    this.socket.on('initIp', (data) => {
      console.log('mon ip:', data);
      this.initObs.next(true);
      this.orchIp = data;
      this.loginURL = 'http://' + this.orchIp + this.port + this.route;
    });
  }

  getAuthenticated(identifiant, pass) {
    this.http.post<any>(this.loginURL, { mail: identifiant, password: pass }).subscribe((res) => {
      this.authenticated = res.status === 'ok';
      this.token = res.token;
      this.id = res.id;
      this.authenticatedObs.next(this.authenticated);
    });
  }
}
