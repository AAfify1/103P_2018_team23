import { Component } from '@angular/core';
import { AppPreferences } from '@ionic-native/app-preferences';
import { BarcodeScanner, BarcodeScanResult, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the OnboardingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var pairDevice: any;

@IonicPage()
@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
})
export class OnboardingPage {
  platformEnabled = false;
  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, private scanner: BarcodeScanner, private prefs: AppPreferences) {
    platform.ready().then(() => {
      this.platformEnabled = true;
      this.prefs.fetch("senderId").then((data) => {
        if(data.length == 0) return;
        console.log("got onboarding token");
        this.navCtrl.push(HomePage, {token: data}).then(() => {
          this.navCtrl.setRoot(HomePage, {token: data}).then(() => {
            this.navCtrl.popToRoot();
          });
        });
      }).catch((err) => {
        console.log(JSON.stringify(err, Object.getOwnPropertyNames(err)));
        console.log("could not retrieve existing onboarding information.");
      });
    });
    
  }

  startOnboardingScanner(name: String) {
    let options: BarcodeScannerOptions = {
      formats: "QR_CODE",
      disableSuccessBeep: true
    };
    this.scanner.scan(options).then((data: BarcodeScanResult) => {
      if(data.cancelled) return;
      //look fam
      console.log(data.text);
      pairDevice(data.text, name, (success, data) => {
        if(success) {
          console.log("got sender id: " + data);
          this.prefs.store("senderId", data);
          this.navCtrl.push(HomePage, {token: data}).then(() => {
            this.navCtrl.setRoot(HomePage, {token: data}).then(() => {
              this.navCtrl.popToRoot();
            });
          });
        } else {
          console.log(data);
        }
      });
    }).catch((err) => {
      console.log(JSON.stringify(err));
    });
  }
}
