//UPDATE THESE VALUES WHEN DEPLOYING
var fs = require("fs");

var db_config = {
	host: "touchstonedb.mysql.database.azure.com",
	user: "sam@touchstonedb",
	password: "COMP103Ppassword",
	database: "touchstone",
	ssl: {
		ca: fs.readFileSync(__dirname + "/BaltimoreCyberTrustRoot.crt.pem")
	}
};

var azure_config = {
	accountName: "touchstonedata",
	accountKey: "Izp0WBwA2CpnRpFw6WhVONSHDXPrxFg6gKLC+aXtVWMyfwzfmGWmh+pQQ2J9b+eWz0TJK32TpSQY0IhoA63GGQ=="
};

module.exports = {
	db: db_config,
	azure: azure_config
};