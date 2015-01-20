<?php
	header('Content-type: text/html; charset=utf-8');
	$con = mysql_connect('localhost', 'root');
	mysql_query('set names "utf8"');
	mysql_select_db('userdb');
	$sql = 'SELECT * FROM data';
	$interval = mysql_query($sql);
	while ($row = mysql_fetch_assoc($interval)) {
		$arr = array($row['user_id'], $row['user_name'], $row['user_pwd'], $row['user_age'], $row['user_mail']);	//形成数组
		//echo json_encode($arr);
		//echo "{$row['user_id']},{$row['user_name']},{$row['user_pwd']},{$row['user_age']},{$row['user_mail']}<br/>";
	}
	echo json_encode($arr);	//输出字符串形式
	mysql_close($con);
?>