<?php
	function putUserTable(&$db, &$row) {
		$statement = $db->Inst()->prepare("INSERT INTO user(name, password) VALUES (:name, :password)");
		$statement->bindParam(':name', $row['name'], PDO::PARAM_STR);
		$statement->bindParam(':password', $row['password'], PDO::PARAM_STR);
		
		$statement->execute();
		
		// 失敗した時にstatus=500を返すようにする
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
		default:
			echo '指定したテーブルへの処理が存在しません';
	}

	exit();
?>