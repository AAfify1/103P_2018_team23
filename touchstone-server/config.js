//UPDATE THESE VALUES WHEN DEPLOYING

var db_config = {
	host: "localhost",
	user: "sam",
	password: "COMP103Ppassword",
	database: "touchstone"
};

var azure_config = {
	accountName: "touchstonedata",
	accountKey: "access-key"
};

module.exports = {
	db: db_config,
	azure: azure_config
};