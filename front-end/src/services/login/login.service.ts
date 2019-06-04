import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  loginURL = 'https://sylvainlangler.alwaysdata.net/api/connection/connect';

  authenticated = false;
  authenticatedObs: BehaviorSubject<boolean> = new BehaviorSubject(this.authenticated);

  constructor(private http: HttpClient) { }

  getAuthenticated(identifiant, pass) {
    // this.http.get<boolean>(this.loginURL, {params: {login: identifiant, password: pass}} ).subscribe((res) => {
    //   this.authenticatedObs.next(res);
    // });

    this.authenticated = identifiant === 'aa' && pass === 'zz';
    this.authenticatedObs.next(this.authenticated);
  }
}
