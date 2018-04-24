var express = require("express");
var cors = require("cors");
var device = require("./device");
var message = require("./message");
var app = express();

app.use(cors());

//routes
app.use("/api/device", device);
app.use("/api/message", message);

app.listen(3000, () => { console.log("server listening on port 3000"); });
