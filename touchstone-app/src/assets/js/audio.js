var audioCtx = null;
var audioRecorder = null;

function initAudioRecorder(callback, recordCompleteCallback, recordErrorCallback){
	if(!audioRecorder) {
		if(!audioCtx) audioCtx = new AudioContext();
		navigator.mediaDevices.getUserMedia({audio: true, video: false})
		.then(function(stream) {
			audioRecorder = new WebAudioRecorder(audioCtx.createMediaStreamSource(stream), {
				workerDir: "/assets/js/",
				encoding: "mp3"
			});
			audioRecorder.onComplete = recordCompleteCallback;
			audioRecorder.onError = recordErrorCallback;

			if(callback) callback(true);
		}).catch(function(err) {
			if(callback) callback(false, err);
		});
	}
}

function recordAudio(callback){
	if(!audioRecorder) callback(false, "recorder not initialised");
	if(audioRecorder.isRecording()) callback(false, "already recording");
	audioRecorder.startRecording();
	if(callback) callback(true);
}

function stopRecording() {
	audioRecorder.finishRecording();
}

function toggleMessageRecording(){
	if(!audioRecorder) return;
	if(!audioRecorder.isRecording()) recordAudio();
	else stopRecording();
}
