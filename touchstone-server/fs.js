var azure = require("azure-storage");
var assert = require("assert");
var crypto = require("crypto");
var config = require("./config").azure;
var Lame = require("node-lame").Lame;
var blobService = azure.createBlobService(config.accountName, config.accountKey);

function init(){
	blobService.createContainerIfNotExists("touchstone-messages", {
	  	publicAccessLevel: "blob"
	}, function(err, result, response) {
		assert.ok(!err, "azure storage returned: " + err);
	});

}

function retrieve(hash, callback) {
	var startDate = new Date();
	var expiryDate = new Date(startDate);
	expiryDate.setMinutes(startDate.getMinutes() + 90); //1.5h
	startDate.setMinutes(startDate.getMinutes() - 90);
	var sharedAccessPolicy = {
	  	AccessPolicy: {
	    	Permissions: azure.BlobUtilities.SharedAccessPermissions.READ,
	    	Start: startDate,
	    	Expiry: expiryDate
	  	}
	};

	var token = blobService.generateSharedAccessSignature("touchstone-messages", hash+".mp3", sharedAccessPolicy);
	callback(false, blobService.getUrl("touchstone-messages", hash+".mp3", token));
}

function put(data, callback) {
	var encoder = new Lame({
		output: "buffer",
		bitrate: 192
	}).setBuffer(data);
	
	encoder.encode().then(() => {
		var bf = encoder.getBuffer();
		var hash = crypto.createHash("md5").update(bf).digest("hex");
		blobService.createBlockBlobFromText("touchstone-messages", hash+".mp3", bf, {
			contentType: "audio/mp3"
		}, (err) => {
			if(err) callback(true, err);
			else callback(false, hash);
		});
	}).catch((err) => {
		callback(true, err);
	});
}

module.exports = {
	init: init,
	retrieve: retrieve,
	put: put
};
