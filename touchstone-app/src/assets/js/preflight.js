var storage = window.localStorage;

function isPreflightCompleted(){
	if(storage.getItem("senderToken") == null) return false;
	else return true;
}

function erasePreflightData(){
	storage.removeItem("senderToken");
}

function initPreflight(videoElement, name, preflightCallback){
	var scanner = new Instascan.Scanner ({ video: videoElement });
	scanner.addListener("scan", function (content) {
		if(content.length == 12) {
			scanner.stop();
			pairDevice(content, name, function (success, info) {
				if(!success) preflightCallback(info);
				else {
					storage.setItem("senderToken", info);
					preflightCompleteCallback(null);
				}
			});
		}
	});
	Instascan.Camera.getCameras().then(function (cameras) {
		if(cameras.length > 0) {
			scanner.start(cameras[0]);
		} else {
			preflightCallback("No compatible cameras detected.");
		}
	}).catch(function (e) {
		console.error(e);
		preflightCallback(e);
	});
}