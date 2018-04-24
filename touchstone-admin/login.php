<?php
    require_once("connect.php");
    session_start();
    $q = $sql->prepare("SELECT * FROM admin_users WHERE username = ?");
    $q->bind_param("s", $_POST["username"]);
    if($q->execute()){
        $q = $q->get_result();
        if($q->num_rows > 0) {
            $r = $q->fetch_assoc();
            if(password_verify($_POST["password"], $r["password"])){
                $_SESSION["user"] = $_POST["username"];
                header("Location: index.php");
            } else {
                header("Location: login.html");
            }
        } else {
            header("Location: login.html");
        }
    } else {
        header("Location: login.html");
    }
?>