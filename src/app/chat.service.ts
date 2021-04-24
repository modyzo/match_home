import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { StorageService } from './shared/services/storage.service';

@Injectable()
export class ChatService {
  constructor(private socket: Socket, private storageService: StorageService) {
    socket.on('disconnect', (reason) => {
      console.log('reason', reason);
    });
    socket.on('connect', (data) => {
      console.log('connected', data);
    });
  }

  sendMessage(message: string, chatId: string, senderId: string) {
    this.socket.emit('messages', { message, chatId, senderId });
  }

  getMessages() {
    return this.socket.fromEvent('messages').pipe(map((data) => data));
  }

  getMessage() {
    return this.socket.fromEvent('message').pipe(map((data) => data));
  }

  joinToChannel(chatId: string) {
    return this.storageService.getItem('token').subscribe((token: string) => {
      this.socket.emit('join', { token, chatId }, (data) => {
        console.log('data', data);
      });
    });
  }

  getException() {
    return this.socket
      .fromEvent('exeption')
      .pipe(map((data: { msg: any }) => data.msg));
  }

  getConnect() {
    return this.socket
      .fromEvent('connect')
      .pipe(map((data: { msg: any }) => data.msg));
  }

  connectToSocket() {
    console.log('connect was clicked');
    this.socket.on('connect', function () {
      console.log('connect');
    });
  }

  disconnectFromSocket() {
    this.socket.on('disconnect', function () {
      console.log('Disconnected');
    });
  }
}
