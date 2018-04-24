<?php
	require_once("login-check.php");
	require_once("connect.php");
	header("Content-Type: application/json");
	$user = $_POST["username"];
	$pwd = $_POST["password"];
	$hash = password_hash($pwd, PASSWORD_DEFAULT); //TODO: verify username uniqueness
	switch ($_POST["action"]) {
		case "new":
			$q = $sql->prepare("INSERT INTO admin_users(username, password) VALUES (?, ?)");
			$q->bind_param("ss", $user, $hash);
			$q->execute();
		break;

		case "update":
			$q = $sql->prepare("UPDATE admin_users SET password = ? WHERE username = ?");
			$q->bind_param("ss", $hash, $user);
			$q->execute();
		break;

		case "delete":
			$q = $sql->prepare("DELETE FROM admin_users WHERE username = ?");
			$q->bind_param("s", $user);
			$q->execute();
		break;


	}
	echo json_encode(array("success" => true)); //TODO: verify the action succeeded
?>