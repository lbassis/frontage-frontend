import { WebsocketMessageHandlerProvider } from './../../providers/websocket-message-handler/websocket-message-handler';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-flags-joytick',
  templateUrl: 'flags-joytick.html',
})
export class FlagsJoytickPage {

  selectedParameter: string;
  parametersList: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public fAppProvider: DataFAppsProvider,
    public websocketMessageHandler: WebsocketMessageHandlerProvider) {
    let joystickParams = navParams.get('joystickParams');

    this.parametersList = joystickParams.parametersList;
    this.selectedParameter = joystickParams.selectedParameter;

    websocketMessageHandler.initSocket(navCtrl);
  }

  sendOption() {
    this.websocketMessageHandler.send('{"flag": "' + this.selectedParameter + '"}');
  }

  stopFApp() {
    this.navCtrl.pop();
  }

  ionViewDidLeave() {

    if (!this.websocketMessageHandler.isExternalyClaused()) {
      this.fAppProvider.stopApp();
      this.websocketMessageHandler.closeSocket();
    }
    this.websocketMessageHandler.stopKeepAliveSender();
  }

  ionViewWillEnter() {
  }
}
