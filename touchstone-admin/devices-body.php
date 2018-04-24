<?php require_once("connect.php"); ?>
<thead>
    <tr>
        <th>Friendly Name</th>
        <th>Device ID</th>
        <th>Last Active</th>
        <th>Pairable</th>
        <th>Actions</th>
    </tr>
</thead>
<tbody>
    <?php
        $res = $sql->query("SELECT * FROM `devices`");
        while(($r = $res->fetch_assoc()) != NULL){ ?>
            <tr>
                <td><?php echo $r["fname"]; ?></td>
                <td><?php echo $r["deviceId"]; ?></td>
                <td><?php echo $r["heartbeat"]; ?></td>
                <td><?php echo ($r["pairable"])?"Yes":"No"; ?></td>
                <td>
                    <a href="#" onclick="rename('<?php echo $r["deviceId"]; ?>', '<?php echo urlencode($r["fname"]); ?>')"><i class="icon icon-edit"></i> Assign friendly name</a><br />
                    <?php if($r["pairable"]) { ?> <a href="#" onclick="generateQr('<?php echo $r["deviceId"]; ?>')"><i class="icon icon-plus"></i> Generate pair code</a><br /><?php } ?>
                    <a href="#" onclick="erase('<?php echo $r["deviceId"]; ?>')"><i class="icon icon-delete"></i> Delete all messages</a><br />
                    <a href="#" onclick="deprovision('<?php echo $r["deviceId"]; ?>')"><i class="icon icon-cross"></i> Deprovision device</a>
                </td>
            </tr>
        <?php }
    ?>
</tbody>