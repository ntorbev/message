import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as io from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private url = 'http://localhost:3000';
  private socket;
  private $subject = new Subject<any>();

  constructor() {
    this.socket = io(this.url);
    this.socket.on('new-message', (message) => {
      this.$subject.next(message);
    });
  }

  sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  getMessage(): Observable<any> {
    return this.$subject.asObservable();
  }

}
