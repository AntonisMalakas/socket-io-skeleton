import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './UserComponent/app.userComponent';
import { AdminComponent } from './AdminComponent/app.adminComponent';
// import { SimpleNotificationsModule } from 'angular2-notifications'; //import the module

const config: SocketIoConfig = { url: 'http://localhost:8000', options: {} };

const appRoutes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'admin', component: AdminComponent },
];


@NgModule({
  declarations: [
    AppComponent, UserComponent, AdminComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
