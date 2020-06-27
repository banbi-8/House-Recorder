<?php
	session_start();
	require_once('db.php');

	$reqType = $_SERVER["REQUEST_METHOD"];
	switch ($reqType) {
		case 'GET':
			getAllUsers();
		break;
		case 'PUT': // already exist model
			updateUser();
		break;
		case 'POST': // model is not saved yet
			saveUser();
		break;
	}

	exit();

	function getAllUsers() {
		$db = new DB();
		$sql = 'select * from user';
			
		$users = array();
		foreach($db->Inst()->query($sql) as $row) {
			$users[] = array(
				'id'=>$row['id'],
				'name'=>$row['name'],
				'password'=>$row['password']
			);
		}
		print json_encode($users);	
	}
	
	function updateUser() {
		$db = new DB();
		$data = json_decode(file_get_contents('php://input'), TRUE);
	
		$statement = $db->Inst()->prepare("UPDATE	user SET name=:name, password=:password WHERE id=:id");
		$statement->bindParam(':id', $data['id'], PDO::PARAM_INT);
		$statement->bindParam(':name', $data['name'], PDO::PARAM_STR);
		$statement->bindParam(':password', $data['password'], PDO::PARAM_STR);
		$statement->execute();
		
		print json_encode($data);
	}

	function saveUser() {
		$db = new DB();
		$data = json_decode(file_get_contents('php://input'), TRUE);
	
		$statement = $db->Inst()->prepare("INSERT INTO user(name, password) VALUES (:name, :password)");
		$statement->bindParam(':name', $data['name'], PDO::PARAM_STR);
		$statement->bindParam(':password', $data['password'], PDO::PARAM_STR);
		$statement->execute();
		
		print json_encode($data);
	}
?>