<?php
	function putUserTable(&$db, &$row) {
		$statement = $db->Inst()->prepare("INSERT INTO user(user_name, password) VALUES (:name, :password)");
		$statement->bindParam(':name', $row['name'], PDO::PARAM_STR);
		$statement->bindParam(':password', $row['password'], PDO::PARAM_STR);
		
		$statement->execute();
		
		// 失敗した時にstatus=500を返すようにする
		print json_encode([]);
	}

	function putBadgetTable(&$db, &$row) {
		$statement = $db->Inst()->prepare("INSERT INTO badget(user_id, badget, suppliment, date) VALUES (:userId, :badget, :suppliment, :date)");
		$statement->bindParam(':user_id', $_SESSION['LOGIN_ID'], PDO::PARAM_INT);
		$statement->bindParam(':badget', $row['value'], PDO::PARAM_INT);
		$statement->bindParam(':suppliment', $row['suppliment'], PDO::PARAM_STR);
		$statement->bindParam(':date', $row['date'], PDO::PARAM_STR);

		$statement->execute();

		print json_encode([]);
	}

	require_once('db.php');

	$postedData = json_decode(file_get_contents('php://input'), TRUE);
	print_r($_POST);
	
	$tableName = $_POST['tableName'];
	$row = $_POST['row'];

	$db = new DB();

	switch ($tableName) {
		case 'user':
			putUserTable($db, $row);
		break;
		case 'badget':
			putBadgetTable($db, $row);
		break;
		default:
			echo '指定したテーブルへの処理が存在しません';
	}

	exit();
?>