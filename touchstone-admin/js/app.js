function generateQr(thing){
    new QRCode($("#qrcode")[0], thing);
    $("#qrModal").addClass("active");
}

function qrClose(){
    $("#qrcode").html("");
    $("#qrModal").removeClass("active");
}

function changePassword(user){
	$("#input-un").val(user);
	$("#input-pw").val("");
    $("#passwordModal").addClass("active");
}

function passwordClose(){
    $("#passwordModal").removeClass("active");
}

function updateUser(){
	var un = $("#input-un").val();
	var pw = $("#input-pw").val();
	$.post("update-user.php", {
		action: "update",
		username: un,
		password: pw
	}, (data) => {
		if(data.success) {location.reload(); passwordClose();}
		else alert(data.err);
	});
}

function addUser(){
	$("#input-un-b").val("");
	$("#input-pw-b").val("");
    $("#newModal").addClass("active");
}

function newClose(){
    $("#newModal").removeClass("active");
}

function createUser(){
	var un = $("#input-un-b").val();
	var pw = $("#input-pw-b").val();
	$.post("update-user.php", {
		action: "new",
		username: un,
		password: pw
	}, (data) => {
		if(data.success) {location.reload(); newClose();}
		else alert(data.err);
	});
}

function deleteUser(user){
	invokeConfirmation("delete", user);
}

var pendingAction = "";
var pendingTarget = "";

function deprovision(device){
	invokeConfirmation("deprovision", device);
}

function erase(device){
	invokeConfirmation("erase", device);
}

function invokeConfirmation(action, target){
	pendingAction = action;
	pendingTarget = target;
	$("#confirmModal").addClass("active");
}

function confirmCancel(){
	pendingAction = "";
	pendingTarget = "";
	$("#confirmModal").removeClass("active");
}

function confirmAction(){
	$.post("update-device.php", {
		action: pendingAction,
		target: pendingTarget
	}, (data) => {
		if(data.success) confirmCancel();
		else alert(data.err);
	});
}

function confirmUserAction(){
	$.post("update-user.php", {
		action: pendingAction,
		username: pendingTarget,
		password: ""
	}, (data) => {
		if(data.success) {location.reload(); confirmCancel();}
		else alert(data.err);
	});
}

function rename(device, cname){
	cname = decodeURIComponent(cname.replace(/\+/g, " "));
	$("#input-fn").val(cname);
	pendingTarget = device;
	$("#nameModal").addClass("active");
}

function nameClose(){
	pendingTarget = "";
	$("#nameModal").removeClass("active");
}

function nameConfirm(){
	$.post("update-device.php", {
		action: "rename",
		target: pendingTarget,
		name: $("#input-fn").val()
	}, (data) => {
		if(data.success) nameClose();
		else alert(data.err);
	});
}