<?php
	require_once("login-check.php");
	require_once("connect.php");
	header("Content-Type: application/json");
	$action = $_POST["action"];
	$device = $_POST["target"];

	//does not clear audio files...
	
	switch ($action){
		case "rename":
			$q = $sql->prepare("UPDATE devices SET fname = ? WHERE deviceId = ?");
			$q->bind_param("ss", $_POST["name"], $device);
			$q->execute();
		break;
		case "erase":
			$q = $sql->prepare("DELETE FROM messages WHERE owner = ?");
			$q->bind_param("s", $device);
			$q->execute();
		break;
		case "deprovision":
			//delete messages
			$q = $sql->prepare("DELETE FROM messages WHERE owner = ?");
			$q->bind_param("s", $device);
			$q->execute();

			//delete senders
			$q = $sql->prepare("DELETE FROM senders WHERE device = ?");
			$q->bind_param("s", $device);
			$q->execute();

			//delete device entry
			$q = $sql->prepare("DELETE FROM devices WHERE deviceId = ?");
			$q->bind_param("s", $device);
			$q->execute();
		break;
	}
	echo json_encode(array("success" => true)); //TODO: verify the action succeeded
?>