import { Injectable } from '@angular/core';
import { Observable, Subject, Observer, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import io from 'socket.io-client';
import { CookieService } from 'ngx-cookie-service';
import { Internship } from '../../models/internship'


@Injectable({
 providedIn: 'root'
})
export class TestServiceService {

  incrementURL = 'https://sylvainlangler.alwaysdata.net/api/increment';
 // incrementURL = 'http://192.168.43.181:9428/api/increment';
 //incrementURL = 'http://localhost:9428/api/increment';

  socketURL = 'https://sylvainlangler.alwaysdata.net/';
 // socketURL = 'http://192.168.43.181:9428/';
 //socketURL = 'http://localhost:9428/';

 increment: Internship;
 incrementObs: BehaviorSubject<Internship> = new BehaviorSubject(this.increment);

 constructor(private http: HttpClient, public cookieService: CookieService) { }

 getIncrement() {
   this.http.get<Internship>(this.incrementURL + '/' + this.cookieService.get('id')).subscribe((res) => {
     this.incrementObs.next(res);
   });
 }

 listen() {
   const socket = io(this.socketURL, {
     query: {
       id: this.cookieService.get('id')
     }
   });

   socket.on('create', (data) => {
     console.log('data:', data);
   });

   socket.on('up', (data) => {
     console.log('data:', data);
     this.getIncrement();
   });

   socket.on('mash', (data) => {
     console.log('mache !', data);
     this.getIncrement();
   });
 }

}


