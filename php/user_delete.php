<?php
	header('Content-type: text/html; charset=utf-8');
	$con = mysql_connect('localhost', 'root');
	mysql_query('set name "utf8"');
	mysql_select_db('userdb');
	$sql = "DELETE FROM data WHERE user_id = $_POST[user_id]";
	mysql_query($sql);
	mysql_close($con);
?>