import { Component } from '@angular/core';
import { Media, MediaObject } from '@ionic-native/media';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { File } from '@ionic-native/file';

declare var getAvailableMessages: any;
declare var getMessageUrl: any;
declare var putWavAudio: any;
declare var timeago: any;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // gotta load dat real data
  history = [];
  senderId = "";
  path = "";
  recording = false;
  recorder: MediaObject;

  constructor(public navCtrl: NavController, private media: Media, private file: File, private platform: Platform, public navParams: NavParams) {
    this.senderId = navParams.get("token"); //update to actual onboarding sender token
    console.log(this.senderId);
    //this.platform.ready().then(()=> {this.path = this.file.tempDirectory.replace(/^file\/\//, '') + "recording.wav"});
    this.platform.ready().then(()=> {this.path = "recording.wav"}); //apparently this works

    getAvailableMessages(this.senderId,
      ((success, data) => {
        if(!success) {console.log(data); return;} //upgrade error handling please
        data.forEach((msg) => {
          this.history.push([msg.status, timeago().format(new Date(msg.date)), msg.hash]);
        });
      })
    );
  }

  recordMessage() {
    this.file.createFile(this.file.tempDirectory, "recording.wav", true).then(() => {
      this.recorder = this.media.create(this.path);
      //this.recorder.onSuccess.subscribe((e) => {console.log(this.recorder.getDuration());});
      this.recorder.onError.subscribe((err) => {console.log(JSON.stringify(err))});
      this.recorder.startRecord();
      this.recording = true;
    }).catch((err) => {console.log(JSON.stringify(err))});
  }

  finaliseMessage(){
    this.recorder.stopRecord();
    this.recorder.release();
    this.file.readAsArrayBuffer(this.file.tempDirectory, "recording.wav").then((body: any) => {
      putWavAudio(this.senderId, body, (err, data) => {
        console.log(data);
        this.history.unshift(["Delivered", timeago().format(new Date()), data]);
      });
    }).catch((err) => {console.log("error: " + JSON.stringify(err, Object.getOwnPropertyNames(err)));});
    this.recording = false;
  }

  discardMessage() {
    this.recorder.stopRecord();
    this.recorder.release();
    this.recording = false;
  }

  playAudio(messageHash: String){
    getMessageUrl(this.senderId, messageHash,
      ((success, data) => {
        if(!success) {console.log(data); return;}
        var audio = new Audio(data);
        audio.play();
      })
    );
  }
}
