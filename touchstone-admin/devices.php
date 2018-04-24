<?php include("top.php"); ?>

<table class="table table-striped table-hover" id="device-table">
    <?php include("devices-body.php"); ?>
</table>
<script type="text/javascript">
    function reloadTable(){
        $("#device-table").load("devices-body.php");
    }
    window.setInterval(reloadTable, 2000);
</script>


<!-- modals -->
<div class="modal modal-sm" id="qrModal">
    <a href="#close" class="modal-overlay" aria-label="Close" onclick="qrClose()"></a>
    <div class="modal-container">
        <div class="modal-header">
            <a href="#close" class="btn btn-clear float-right" onclick="qrClose()" aria-label="Close"></a>
            <div class="modal-title h5">Pairing Code</div>
        </div>
        <div class="modal-body">
            <div class="content" style="text-align:center">
                <div id="qrcode"></div>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="confirmModal">
    <a href="#close" class="modal-overlay" aria-label="Close" onclick="confirmCancel()"></a>
    <div class="modal-container">
        <div class="modal-header">
            <a href="#close" class="btn btn-clear float-right" onclick="confirmCancel()" aria-label="Close"></a>
            <div class="modal-title h5">Are you sure?</div>
        </div>
        <div class="modal-body">
            <div class="content">
                This action cannot be undone!
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn" onclick="confirmCancel()">No</button>
            <button class="btn btn-error" onclick="confirmAction()">Yes</button>
        </div>
    </div>
</div>

<div class="modal" id="nameModal">
    <a href="#close" class="modal-overlay" aria-label="Close" onclick="nameClose()"></a>
    <div class="modal-container">
        <div class="modal-header">
            <a href="#close" class="btn btn-clear float-right" onclick="nameClose()" aria-label="Close"></a>
            <div class="modal-title h5">Update Friendly Name</div>
        </div>
        <div class="modal-body">
            <div class="content" style="text-align:center">
                <input class="form-input" type="text" id="input-fn" name="friendlyname" placeholder="Friendly Name">
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn" onclick="nameClose()">Cancel</button>
            <button class="btn btn-primary" onclick="nameConfirm()">Update</button>
        </div>
    </div>
</div>

<?php include("bottom.php"); ?>