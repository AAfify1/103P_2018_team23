<?php
    $MYSQL_HOST = "touchstonedb.mysql.database.azure.com";
    $MYSQL_USER = "sam@touchstonedb"; //update this!
    $MYSQL_PASSWORD = "COMP103Ppassword"; //update this!
    $MYSQL_DB = "touchstone";
    $sql = mysqli_init();
    $sql -> ssl_set(NULL, NULL, "./BaltimoreCyberTrustRoot.crt.pem", NULL, NULL);
    $sql->real_connect($MYSQL_HOST, $MYSQL_USER, $MYSQL_PASSWORD, $MYSQL_DB);
?>
