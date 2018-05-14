import { OnInit, Component } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'admin-component',
  templateUrl: './app.adminComponent.html'
})
export class AdminComponent implements OnInit, OnDestroy {


  constructor(private socket: Socket) {

  }

  ngOnInit(): void {
    this.socket.emit('adminSocket', '2222');
    this.notificationListener();
  }

  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

  sendNotification() {
    this.socket.emit('create notification', { 'message': 'hello', 'userId': '1111' }, () => {
      console.log('notification sent to user 1111 !!!')
    });
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