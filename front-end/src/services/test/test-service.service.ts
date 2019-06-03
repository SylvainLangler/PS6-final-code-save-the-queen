import { Injectable } from '@angular/core';
import { Observable, Subject, Observer, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as socketIo from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  incrementURL = 'https://sylvainlangler.alwaysdata.net/api/increment';
  // incrementURL = 'http://192.168.43.181:9428/api/increment';
  // incrementURL = 'http://localhost:9428/api/increment';

  socketURL = 'https://sylvainlangler.alwaysdata.net/';
  // socketURL = 'http://192.168.43.181:9428/';
  // socketURL = 'http://localhost:9428/';

  increment: number;
  incrementObs: BehaviorSubject<number> = new BehaviorSubject(this.increment);

  constructor(private http: HttpClient) {}

  getIncrement() {
    this.http.get<number>(this.incrementURL).subscribe((res) => {
      this.incrementObs.next(res);
    });
  }

  listen() {
    const socket = socketIo(this.socketURL);

    socket.on('create', (data) => {
      console.log('data:', data);
    });

    socket.on('mash', (data) => {
      console.log('mache !', data);
      this.getIncrement();
    });
  }

}
