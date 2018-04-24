var mysql = require("mysql");
var config = require("./config");

var baseConnection;
var connected = false;
function getConnection(){
	if(!connected){
		baseConnection = mysql.createConnection(config);
		baseConnection.connect();
		baseConnection.on("error", (err) =>{
			connected = false;
		});
		connected = true;
	}
	return baseConnection;
}

function queryDb(query, params, callback) {
	var connection = getConnection();
	connection.query(query, params, callback);
}

function escape(str) { return mysql.escape(str); }


module.exports = {
	query: queryDb,
	escape: escape
}
