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

	function putUserTable(&$dbh, &$row) {
		$statement = $dbh->prepare("INSERT INTO user(user_name, password) VALUES (:name, :password)");
		$statement->bindParam(':name', $row['name'], PDO::PARAM_STR);
		$statement->bindParam(':password', $row['password'], PDO::PARAM_STR);
		
		$statement->execute();
		
		// 失敗した時にstatus=500を返すようにする
		print json_encode([]);
	}

	$tableName = $_POST['tableName'];
	$row = $_POST['row'];

	$dbh = connect();
	switch ($tableName) {
		case 'user':
			putUserTable($dbh, $row);
		break;
		default:
			print 'do nothing';
	}

	$dbh = NULL;
	exit();
?>