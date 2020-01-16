<?php
	function connect() {
		$dsn = 'mysql:dbname=house_recorder;host=localhost;charset=utf8mb4';
		$user = 'manager';
		$pass = 'test';
	
		try {
			$dbh = new PDO($dsn, $user, $pass);

			return $dbh;
		} catch (PDOException $err) {
			print('Error:'.$err->getMessage());
		}
	
	}

	function getUserTable(&$dbh) {
		$sql = 'select * from user';
			
		$user = array();
		foreach($dbh->query($sql) as $row) {
			$user[] = array(
				'id'=>$row['user_id'],
				'name'=>$row['user_name'],
				'password'=>$row['password']
			);
		}
		print json_encode($user);	
	}

	$tableName = $_GET['tableName'];

	$dbh = connect();
	switch ($tableName) {
		case 'user':
			getUserTable($dbh);
		break;
		default:
			print 'do nothing';
	}

	$dbh = NULL;
	exit();
?>