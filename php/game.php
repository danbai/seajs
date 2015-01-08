<?php
	$con = mysql_connect('localhost', 'root');
	mysql_select_db('books');
	/*$sql = 'CREATE TABLE game( ' .
		   'user_id INT NOT NULL AUTO_INCREMENT, ' .
		   'user_ip VARCHAR(40), ' .
		   'user_scroe INT, ' .
		   'user_date VARCHAR(100), ' .
		   'PRIMARY KEY (user_id));';
	mysql_query($sql);*/
	
	if (isset($_POST['user_ip'])) {
		$user_ip = $_POST['user_ip'];
		$user_scroe = $_POST['user_scroe'];
		$user_date = $_POST['user_date'];
		$sql = "INSERT INTO game " .
			   "(user_ip, user_scroe, user_date) " .
			   "VALUES " .
			   "('$user_ip', '$user_scroe', '$user_date')";
		mysql_query($sql);
	}
	
	
	$sql2 = 'SELECT * FROM game';
	$interval = mysql_query($sql2);
	while ($row = mysql_fetch_array($interval, MYSQL_NUM)) {
		echo "user_ip $row[1] <br/>" .
			 "user_score $row[2] <br/>" .
			 "user_date $row[3] <br/>" .
			 "----------------- <br/>";
	}

	mysql_close($con);
?>