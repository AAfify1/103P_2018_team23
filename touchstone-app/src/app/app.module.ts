import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { File } from '@ionic-native/file'
import { Media } from '@ionic-native/media';
import { BarcodeScanner } from '@ionic-native/barcode-scanner'
import { AppPreferences } from '@ionic-native/app-preferences';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { OnboardingPage } from '../pages/onboarding/onboarding';
import { OnboardingPageModule } from '../pages/onboarding/onboarding.module'
import { HomePageModule } from '../pages/home/home.module'

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    OnboardingPageModule,
    HomePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OnboardingPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Media,
    File,
    AppPreferences,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
