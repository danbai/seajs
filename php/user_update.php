<?php
	header("Content-type: text/html; charset=utf-8");
	$con = mysql_connect('localhost', 'root');
	mysql_query('set names "utf8"');
	mysql_select_db('userdb');
	$sql = "UPDATE data SET user_name = '$_POST[user_name]', user_pwd = '$_POST[user_pwd]', user_age = $_POST[user_age], user_mail = '$_POST[user_mail]'
			WHERE user_id = $_POST[user_id]";
	$up = mysql_query($sql);
	if (!$up) {
		die(mysql_error());
	}
	mysql_close($con);
?>