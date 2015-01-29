<?php
	header('Content-type: text/html; charset=utf-8');
	$con = mysql_connect('localhost', 'root');
	mysql_query('set names "utf8"');
	mysql_select_db('userdb');
	$sql = 'CREATE TABLE if not exists card (
				id INT NOT NULL AUTO_INCREMENT,
				ip CHAR(40) NOT NULL,
				score CHAR(40) NOT NULL,
				time CHAR(40) NOT NULL,
				PRIMARY KEY (id)
			)';
	$tb = mysql_query($sql);
	if (!$tb) {
		die(mysql_error());
	}
	$ip = $_SERVER['REMOTE_ADDR'];
	if ($_REQUEST['action'] == 'updateUser') {
		$sql2 = "INSERT INTO card 
				(ip, score, time)
				VALUES
				('$ip', '$_POST[score]', '$_POST[time]')";
		$in = mysql_query($sql2);
		if (!$in) {
			die(mysql_error());
		}
	} else if ($_REQUEST['action'] == 'selectMe') {
		$sql2 = "SELECT * FROM card WHERE ip = '$ip'";
		$interval = mysql_query($sql2);
		if (!$interval) {
			die(mysql_error());
		}
		while ($row = mysql_fetch_assoc($interval)) {
			echo "{$row['id']}, {$row['ip']}, {$row['score']}, {$row['time']}<br/>";
		}
	} else if ($_REQUEST['action'] == 'selectAll') {
		$sql2 = 'SELECT * FROM card';
		$interval = mysql_query($sql2);
		while ($row = mysql_fetch_assoc($interval)) {
			echo "{$row['id']}, {$row['ip']}, {$row['score']}, {$row['time']}<br/>";
		}
	}
	mysql_close($con);
?>