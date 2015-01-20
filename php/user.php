<?php
	header("Content-type: text/html; charset=utf-8"); 
	$con = mysql_connect('localhost', 'root');
	mysql_query('set names "utf8"');
	$sql = 'CREATE DATABASE if not exists userdb';
	mysql_query($sql);
	mysql_select_db('userdb');

	$sql2 = 'CREATE TABLE if not exists data (
				user_id INT NOT NULL AUTO_INCREMENT,
				user_name VARCHAR(40) NOT NULL,
				user_pwd VARCHAR(40) NOT NULL,
				user_age INT NOT NULL,
				user_mail VARCHAR(40) NOT NULL,
				PRIMARY KEY (user_id)
			)';
	$tb = mysql_query($sql2);

	/*$sql3 = 'INSERT INTO data 
			(user_name, user_pwd, user_age, user_mail)
			VALUES
			("蛋白", 317222, 22, "1006894640@qq.com")';*/
	if (isset($_POST['user_name'])) {
		$sql3 = "INSERT INTO data 
				(user_name, user_pwd, user_age, user_mail)
				VALUES
				('$_POST[user_name]', '$_POST[user_pwd]', '$_POST[user_age]', '$_POST[user_mail]')";
		$in = mysql_query($sql3);
		if (!$in) {
			die(mysql_error());
		}
	}

	mysql_close($con);
?>