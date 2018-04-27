var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var db = require("./db");
var fs = require("./fs");

var parser = bodyParser.raw({type: "audio/wav", limit: "100mb"});

fs.init();

router.get(
	"/query/:senderId",
	(req, res) => {
		db.query(
			"SELECT `hash`, `date`,`status` FROM `messages` WHERE `from` = ? ORDER BY `date` DESC",
			[req.params.senderId],
			(err, data, fields) => {
				if(err) {
					res.json({
						success: false,
						error: err
					});
				} else {
					res.json({
						success: true,
						entries: data
					});
				}
			}
		)
	}
);

router.put(
	"/post/:sender",
	parser,
	(req, res) => {
		console.log(JSON.stringify(req.params));
		db.query(
			"SELECT `device` FROM `senders` WHERE `token` = ?",
			[req.params.sender],
			(err, data, fields) => {
				if(err || data.length == 0) { console.log("no sender");
					res.json({
						success: false,
						error: err
					});
				} else {
					var deviceId = data[0].device;
					console.log(deviceId);
					fs.put(
						req.body,
						(err, hash) => {
							if(err) {
								res.json({
									success: false,
									error: err
								});
							} else {
								db.query(
									"INSERT INTO `messages` (`hash`, `owner`, `from`) VALUES (?, ?, ?)",
									[hash, deviceId, req.params.sender],
									(err, data, fields) => {
										console.log(hash);
										if(err) {
											res.json({
												success: false,
												error: err
											});
										} else {
											res.json({
												success: true,
												hash: hash
											});
										}
									}
								);
							}
						}
					);
				}
			}
		);
	}
);

router.get(
	"/:id/:deviceId",
	(req, res) => {
		//verify hash exists
		db.query(
			"SELECT * FROM `messages` WHERE `hash` = ? AND `owner` = ?",
			[req.params.id, req.params.deviceId],
			(err, data, fields) => {
				if(err) {
					res.json({
						success: false,
						error: err
					});
				} else if (data.length == 0) {
					res.json({
						success: false,
						error: "no such file found"
					});
				} else {
					db.query("UPDATE `messages` SET `status` = \"Opened\" WHERE `hash` = ?", [req.params.id], ()=>{});
					fs.retrieve(
						req.params.id,
						(err, url) => {
							if(err) {
								res.json({
									success: false,
									error: err
								});
							} else {
								res.json({
									success: true,
									url: url
								});
							}
						}
					);
				}
			}
		);
	}
);

router.get(
	"/:id", //TODO: highly redundant but i need to update the device firmware
	(req, res) => {
		//verify hash exists
		db.query(
			"SELECT * FROM `messages` WHERE `hash` = ?",
			[req.params.id],
			(err, data, fields) => {
				if(err) {
					res.json({
						success: false,
						error: err
					});
				} else if (data.length == 0) {
					res.json({
						success: false,
						error: "no such file found"
					});
				} else {
					fs.retrieve(
						req.params.id,
						(err, url) => {
							if(err) {
								res.json({
									success: false,
									error: err
								});
							} else {
								res.json({
									success: true,
									url: url
								});
							}
						}
					);
				}
			}
		);
	}
);


module.exports = router;
