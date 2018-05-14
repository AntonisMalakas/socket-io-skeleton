import { Component } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'user-component',
  templateUrl: './app.userComponent.html'

})
export class UserComponent implements OnInit {

  constructor(private socket: Socket) {

  }
  ngOnInit(): void {
    this.socket.emit('userSocket', '1111');
    this.notificationListener();

  }

  requestConfirmation() {
    debugger;
    this.socket.emit('requestConfirmation', { 'message': 'please, confirm my request', 'userId': '2222' })
  }

  notificationListener() {
    document.addEventListener('DOMContentLoaded', () => {
      let x = Notification.requestPermission();
      if (!x)
        Notification.requestPermission();
    });
    this.socket.on('new notification', (data) => {
      // alert(data)
      if (!Notification) {
        alert('Desktop notifications not available in your browser. Try Chrome.');
        return;
      }
      let x = Notification.requestPermission();
      if (!x)
        Notification.requestPermission();
      else {
        var notification = new Notification('IRIS Notification', {
          icon: 'assets/notification-icon/bell-icon.png',
          body: data,
        });
        setTimeout(() => {
          notification.close();
        }, 4000);
      }
    });
  }

}