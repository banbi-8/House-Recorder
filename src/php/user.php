<?php
	session_start();
	require_once('db.php');

	$reqType = $_SERVER["REQUEST_METHOD"];
	switch ($reqType) {
		case 'GET':
			getAllUsers();
		break;
		case 'PUT': // already exist model
			updateExpenseItem();
		break;
		case 'POST': // model is not saved yet
			saveUser();
		break;
	}

	exit();

	function getAllUsers() {
		$db = new DB();
		$sql = 'select * from user';
			
		$user = array();
		foreach($db->Inst()->query($sql) as $row) {
			$user[] = array(
				'id'=>$row['id'],
				'name'=>$row['name'],
				'password'=>$row['password'],
				'mailadress'=>$row['mailadress']
			);
		}
		print json_encode($user);	
	}
	
	function updateExpenseItem() {
	}

	function saveUser() {
		$db = new DB();
		$postedData = json_decode(file_get_contents('php://input'), TRUE);
	
		$statement = $db->Inst()->prepare("INSERT INTO user(name, password, mailadress) VALUES (:name, :password, :mailadress)");
		$statement->bindParam(':name', $postedData['name'], PDO::PARAM_STR);
		$statement->bindParam(':password', $postedData['password'], PDO::PARAM_STR);
		$statement->bindParam(':mailadress', $postedData['mailadress'], PDO::PARAM_STR);
		
		$statement->execute();
		
		// 失敗した時にstatus=500を返すようにする
		print json_encode([]);
	}
?>