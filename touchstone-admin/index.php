<?php include("top.php"); ?>
<table class="table table-striped table-hover">
    <tbody>
        <tr><td>Total provisioned devices</td><td>
            <?php
                $res = $sql -> query("SELECT COUNT(*) AS `count` FROM `devices`");
                $r = $res->fetch_assoc();
                echo $r["count"];
            ?>
        </td></tr>
        <tr><td>Total messages received</td><td>
            <?php
                $res = $sql -> query("SELECT COUNT(*) AS `count` FROM `messages`");
                $r = $res->fetch_assoc();
                echo $r["count"];
            ?>
        </td></tr>
    </tbody>
</table>
<?php include("bottom.php"); ?>