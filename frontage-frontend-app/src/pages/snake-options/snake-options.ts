import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { SnakeJoystickPage } from './../snake-joystick/snake-joystick';
import { WaitingPage } from './../waiting/waiting';
import { DataFAppsProvider } from './../../providers/data-f-apps/data-f-apps';
import { FAppOptions } from './../../models/f-app-options';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-snake-options',
  templateUrl: 'snake-options.html',
})
export class SnakeOptionsPage {

  fAppOptions: FormGroup;
  fAppPosition: number;
  isAdmin: boolean = false;

  constructor(public navCtrl: NavController, public dataFAppsProvider: DataFAppsProvider, public formBuilder: FormBuilder, public localStorageProvider : LocalStorageProvider) {
    //Check if the connected user is admin
    this.isAdmin = this.localStorageProvider.isAdmin();

    this.fAppOptions = formBuilder.group({
      fAppColor: ""
    });
  }

  launchApp() {

    let options: FAppOptions = {
      name: "Snake",
      params: {
      }
    }
    
    this.dataFAppsProvider.launchFApp(options)
      .subscribe(response => this.goToNextPage(response));
  }

  goToNextPage(response) {
    this.navCtrl.pop();
    this.navCtrl.push(WaitingPage, {info:response, joystick:SnakeJoystickPage});
  }

  forceFapp() {
    let options: FAppOptions = {
      name: "Snake",
      params: {}
    };
    this.dataFAppsProvider.launchForcedFApp(options)
      .subscribe(response => response);
  };
}
