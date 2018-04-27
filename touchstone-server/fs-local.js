var fs = require("fs");
var crypto = require("crypto");
var Lame = require("node-lame").Lame;

var STATIC_PREFIX = "https://ts.mntco.de/";
var PREFIX = "tsdata/"

function init(){
	//do nothing
}

function retrieve(hash, callback) {
	callback(null, STATIC_PREFIX + PREFIX + hash + ".mp3"); //testing
}

function put(data, callback) {
	var encoder = new Lame({
		output: "buffer",
		bitrate: 192
	}).setBuffer(data);
	
	encoder.encode().then(() => {
		var bf = encoder.getBuffer();
		var hash = crypto.createHash("md5").update(bf).digest("hex");
		var handle = fs.createWriteStream(PREFIX + hash + ".mp3");
		handle.end(bf, (err) => callback(err, hash));
	}).catch((err) => {
		callback(true, err);
	});
}

module.exports = {
	init: init,
	retrieve: retrieve,
	put: put
};
