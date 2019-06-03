import { Injectable } from '@angular/core';
import { Observable, Subject, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as socketIo from 'socket.io-client';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  constructor(private http: HttpClient, public router: Router) { }

  incrementURL = 'http://localhost:9428/api/increment';

  socketURL = 'http://localhost:9428/';


  private subject: Subject<MessageEvent>;

  getIncrement(): Observable<number> {
    return this.http.get<number>(this.incrementURL);
  }

  listen() {
    const socket = socketIo(this.socketURL);

    socket.on('create', (data) => {
      console.log('data:', data);
    });

    socket.on('up', (data) => {
      console.log('uped !', data);
    });

    socket.on('mash', (data) => {
      console.log('mache !', data);
      this.router.navigate(['waiter']);

    });
  }

}
