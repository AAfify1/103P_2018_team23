<?php include("top.php"); ?>
<table class="table table-striped table-hover">
	<tr>
		<th>User</th>
		<th>Actions</th>
	<tr>
	<?php
		$res = $sql->query("SELECT username FROM admin_users");
		while(($q = $res -> fetch_assoc()) != NULL) { 
	?>
		<tr>
			<td width="70%"><?php echo $q["username"]; ?></td>
			<td width="30%">
                <a href="#" onclick="changePassword('<?php echo $q["username"]; ?>')"><i class="icon icon-edit"></i> Reset password...</a><br />
                <a href="#" onclick="deleteUser('<?php echo $q["username"]; ?>')"><i class="icon icon-delete"></i> Delete User...</a>
            </td>
		</tr>
	<?php
		}
	?>
	<tr><td colspan="2" style="text-align:center"><a href="#" onclick="addUser()"><i class="icon icon-plus"></i> Add new user...</a></td></tr>

</table>

<!-- modals -->
<div class="modal" id="passwordModal">
    <a href="#close" class="modal-overlay" aria-label="Close" onclick="passwordClose()"></a>
    <div class="modal-container">
        <div class="modal-header">
            <a href="#close" class="btn btn-clear float-right" onclick="passwordClose()" aria-label="Close"></a>
            <div class="modal-title h5">Reset Password</div>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <input class="form-input" type="text" id="input-un" disabled name="username" placeholder="Username">
                <input class="form-input" type="password" id="input-pw" name="password" placeholder="New Password">
            </div>
        </div>
        <div class="modal-footer">
	    	<button class="btn btn-primary" onclick="updateUser()">Update</button>
	    </div>
    </div>
</div>

<div class="modal" id="newModal">
    <a href="#close" class="modal-overlay" aria-label="Close" onclick="newClose()"></a>
    <div class="modal-container">
        <div class="modal-header">
            <a href="#close" class="btn btn-clear float-right" onclick="newClose()" aria-label="Close"></a>
            <div class="modal-title h5">New User</div>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <input class="form-input" type="text" id="input-un-b" name="username" placeholder="Username">
                <input class="form-input" type="password" id="input-pw-b" name="password" placeholder="New Password">
            </div>
        </div>
        <div class="modal-footer">
	    	<button class="btn btn-primary" onclick="createUser()">Create</button>
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
            <button class="btn btn-error" onclick="confirmUserAction()">Yes</button>
        </div>
    </div>
</div>
<?php include("bottom.php"); ?>