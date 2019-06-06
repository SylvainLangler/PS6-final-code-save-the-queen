import { Injectable } from '@angular/core';
import { Observable, Subject, Observer, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import io from 'socket.io-client';
import { CookieService } from 'ngx-cookie-service';
import { Internship } from '../../models/internship';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  // incrementURL = 'https://sylvainlangler.alwaysdata.net/api/increment';
  // incrementURL = 'http://192.168.43.181:9428/api/increment';
  incrementURL = '';
  route = '/increment';

  // socketURL = 'https://sylvainlangler.alwaysdata.net/';
  // socketURL = 'http://192.168.43.181:9428/';
  socketURL = 'http://192.168.43.58:1880/';

  increment: Internship;
  incrementObs: BehaviorSubject<Internship> = new BehaviorSubject(this.increment);

  socket;
  port = ':1880';

  constructor(private http: HttpClient, public cookieService: CookieService, public loginService: LoginService) {
    this.socket = this.loginService.socket;
    this.incrementURL = 'http://' + this.cookieService.get('ip') + this.port + this.route;
  }

  getIncrement() {
    this.http.get<Internship>(this.incrementURL, { params: { id: this.cookieService.get('id') } }).subscribe((res) => {
      this.incrementObs.next(res);
    });
  }

  listen() {

    this.socket.on('up', (data) => {
      console.log('up data:', data);
      this.getIncrement();
    });

  }

}


