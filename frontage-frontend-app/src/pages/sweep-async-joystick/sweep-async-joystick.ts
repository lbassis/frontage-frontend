import { WebsocketMessageHandlerProvider } from './../../providers/websocket-message-handler/websocket-message-handler';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-sweep-async-joystick',
  templateUrl: 'sweep-async-joystick.html',
})
export class SweepAsyncJoystickPage {

  socket: WebSocket;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public fAppProvider: DataFAppsProvider, public websocketMessageHandler:WebsocketMessageHandlerProvider) {

    websocketMessageHandler.initSocket(navCtrl);
  }

  ionViewDidLeave() {
    if (!this.websocketMessageHandler.isExternalyClaused()) {
      this.fAppProvider.stopApp();
      this.websocketMessageHandler.closeSocket();
    }
    this.websocketMessageHandler.stopKeepAliveSender();
  }

  stopFApp() {
    this.navCtrl.pop();
  }
}
