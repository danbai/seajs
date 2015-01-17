<?php
	$con = mysql_connect('localhost', 'root');
	mysql_select_db('books');
	/*$sql22 = 'CREATE TABLE if not exists msg
			(
				msg_id INT NOT NULL AUTO_INCREMENT,
				msg_user VARCHAR(40) NOT NULL,
				msg_time VARCHAR(40),
				PRIMARY KEY (msg_id)
			)';*/
	$sql33 = 'ALTER TABLE msg ADD msg_con VARCHAR(400)';
	mysql_query($sql33);

	if (isset($_POST['msg_user'])) {
		$sql2 = "INSERT INTO msg (msg_user, msg_time, msg_con)
				VALUES
				('$_POST[msg_user]', '$_POST[msg_time]', '$_POST[msg_con]')";
		
		$table = mysql_query($sql2);
		if (!$table) {
			die(mysql_error());
		}
	}

	$sql3 = 'SELECT msg_user,msg_time,msg_con FROM msg ORDER BY msg_id';
	$interval = mysql_query($sql3);
	while ($row = mysql_fetch_assoc($interval)) {
		echo "{$row['msg_time']} <span style='color:#f00'>{$row['msg_user']}</span> {$row['msg_con']} <br/>";
	}

	mysql_close($con);
?>