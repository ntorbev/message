import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-room',
  templateUrl: './message-room.component.html',
  styleUrls: ['./message-room.component.scss']
})
export class MessageRoomComponent implements OnInit {
  message: string;
  messages: string[] = [];

  constructor(private messageService: MessageService, private authService: AuthService) {
  }

  sendMessage() {
    this.messageService.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit() {
    this.messageService.getMessage().pipe(
      debounceTime(500)
    ).subscribe((message: string) => {
      const currentTime = moment().format('hh:mm:ss a');
      const messageWithTimestamp = `${this.authService.userName} ${currentTime}: ${message}`;
      this.messages.push(messageWithTimestamp);
    });
  }

}
