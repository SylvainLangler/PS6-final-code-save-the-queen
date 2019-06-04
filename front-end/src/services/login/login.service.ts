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
    this.http.post<any>(this.loginURL, {mail: identifiant, password: pass} ).subscribe((res) => {
      console.log("res", res.status === 'ok');
      this.authenticated = res.status === 'ok';
      console.log("authen", this.authenticated);
      this.authenticatedObs.next(this.authenticated);
    });
  }
}
