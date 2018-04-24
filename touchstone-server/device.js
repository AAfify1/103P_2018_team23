var express = require("express");
var router = express.Router();
var db = require("./db");
var uuid = require("uuid/v4");

router.get(
	"/:id/setpair",
	(req, res) => {
		db.query(
			"UPDATE `devices` SET `pairable` = 2 WHERE `deviceId` = ?",
			[req.params.id],
			(err, data, fields) => {
				if(err) {
					res.json({
						success: false,
						error: err
					});
				} else {
					res.json({success: true});
				}
			}
		);
	}
);

router.get(
	"/:id/provision",
	(req, res) => {
		db.query(
			"INSERT INTO `devices` (`deviceId`) VALUES (?)",
			[req.params.id],
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
		);
	}
);

router.get(
	"/:id/validate",
	(req, res) => {
		db.query(
			"SELECT COUNT(*) AS `count` FROM `devices` WHERE `deviceId` = ?",
			[req.params.id],
			(err, data, fields) => {
				if(err) {
					res.json({
						success: false,
						error: err
					});
				} else {
					res.json({
						success: true,
						registered: (data[0].count > 0)
					});
				}
			});
	}
);

router.get(
	"/:id/ping", 
	(req, res) => {
		db.query(
			"SELECT `from`, `hash`, `date` FROM `messages` LEFT JOIN `devices` ON `messages`.`owner` = `devices`.`deviceId` WHERE `owner` = ? AND `date` > `devices`.`heartbeat` ORDER BY `date` ASC",
			[req.params.id],
			(err, data, fields) => {
				if(err) {
					res.json({
						success: false,
						error: err
					});
				} else {
					//update last sync
					db.query("UPDATE `devices` SET `heartbeat` = NOW(), pairable = GREATEST(0, pairable - 1) WHERE `deviceId` = ?", [req.params.id]);
					res.json({
						success: true,
						entries: data
					});
				}	
			}
		);
	}
);

router.get(
	"/:id/messages",
	(req, res) => {
		db.query(
			"SELECT `from`, `hash`, `date` FROM `messages` WHERE `owner` = ? ORDER BY `date` ASC",
			[req.params.id],
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

router.get(
	"/:id/pair/:name",
	(req, res) => {
		db.query(
			"SELECT * FROM `devices` WHERE `deviceId` = ? AND `pairable` > 0",
			[req.params.id],
			(err, data, fields) => {
				if(err) {
					res.json({
						success: false,
						error: err
					});
				} else if(data.length == 0) {
					res.json({
						success: false,
						error: "device is not pairable"
					});
				}  else {
					var uid = uuid();
					db.query(
						"INSERT INTO `senders` (`name`, `token`, `device`) VALUES (?, ?, ?)",
						[req.params.name, uid, req.params.id],
						(err, data, fields) => {
							if(err){
								res.json({
									success: false,
									error: err
								});
							} else {
								res.json({
									success: true,
									senderId: uid
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
