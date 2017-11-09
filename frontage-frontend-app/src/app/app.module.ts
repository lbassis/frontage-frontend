import { WaitingComponent } from './../components/waiting-component';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FAppListPage } from '../pages/f-app-list/f-app-list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataFAppsProvider } from '../providers/data-f-apps/data-f-apps';
import { HttpModule } from '@angular/http';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { TimeProvider } from '../providers/time/time';

let components:any[] = [
    MyApp,
    HomePage,
    FAppListPage,
    WaitingComponent
];

@NgModule({
  declarations: components,
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: components,
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataFAppsProvider,
    AuthenticationProvider,
    TimeProvider
  ]
})
export class AppModule {}
