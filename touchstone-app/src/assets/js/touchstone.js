function pairDevice(deviceId, name, callback){
	$.ajax(
		{
			url: "https://ts.mntco.de/api/device/" + deviceId + "/pair/" + name,
			success: function (data) {
				if(data.success) callback(true, data.senderId);
				else callback(false, data.error);
			},
			error: function (xhr, status, err) {
				callback(false, err);
			}
		}
	);
}

function getAvailableMessages(senderId, callback) {
	$.ajax(
		{
			url:"https://ts.mntco.de/api/message/query/" + senderId,
			success: function (data) {
				if(data.success) callback(true, data.entries);
				else callback(false, data.error);
			},
			error: function (xhr, status, err) {
				callback(false, err);
			}
		}
	);
}

function getMessageUrl(senderId, messageId, callback) {
	$.ajax(
		{
			url: "https://ts.mntco.de/api/message/" + messageId,
			success: function (data) {
				if(data.success) callback(true, data.url);
				else callback(false, data.error);
			},
			error: function (xhr, status, err) {
				callback(false, err);
			}
		}
	);
}

function putWavAudio(senderId, blob, callback){
	$.ajax(
		{
			url:"https://ts.mntco.de/api/message/post/" + senderId,
			type: "PUT",
			contentType: "audio/wav",
			data: blob,
			processData: false,
			success: function (data) {
				if(data.success) callback(true, data.hash);
				else callback(false, data.error);
			},
			error: function (xhr, status, err) {
				callback(false, err);
			}
		}
	);
}

