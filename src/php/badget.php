<?php
	session_start();
	require_once('db.php');

	$reqType = $_SERVER["REQUEST_METHOD"];
	switch ($reqType) {
		case 'GET':
			getAllBadgetItem();
		break;
		case 'PUT': // already exist model
			updateBadgetItem();
		break;
		case 'POST': // model is not saved yet
			saveBadgetItem();
		break;
	}

	exit();

	function getAllBadgetItem() {
		$db = new DB();
		$uid = $_SESSION['LOGIN_ID'];
		$sql = "select * from badget where user_id='$uid'";
			
		$res = array();
		foreach($db->Inst()->query($sql) as $row) {
			$res[] = array(
				'id'=>$row['badget_id'],
				'name'=>$row['name'],
				'value'=>$row['badget'],
				'date'=>$row['date'],
				'suppliment'=>$row['suppliment']
			);
		}

		print json_encode($res);	
	}
	
	function updateBadgetItem() {
		$db = new DB();
		$putData = json_decode(file_get_contents('php://input'), TRUE);

		// parse data
		$badgetID = (int)$putData['id'];
		$name = (string)$putData['name'];
		$value = (int)$putData['value'];
		$suppliment = (string)$putData['suppliment'];
		$date = (string)$putData['date'];

		// prepare sql statement
		$statement = $db->Inst()->prepare("UPDATE	badget SET name=:name, badget=:badget, suppliment=:suppliment, date=:date WHERE badget_id=:badgetID");
		$statement->bindParam(':name', $name, PDO::PARAM_STR);
		$statement->bindParam(':badget', $value, PDO::PARAM_INT);
		$statement->bindParam(':suppliment', $suppliment, PDO::PARAM_STR);
		$statement->bindParam(':date', $date, PDO::PARAM_STR);
		$statement->bindParam(':badgetID', $badgetID, PDO::PARAM_INT);

		$statement->execute();

		print json_encode($putData);
	}

	function saveBadgetItem() {
		$db = new DB();
		$postedData = json_decode(file_get_contents('php://input'), TRUE);

		// parse data
		$loginID = (int)$_SESSION['LOGIN_ID'];
		$name = (string)$putData['name'];
		$value = (int)$putData['value'];
		$suppliment = (string)$postedData['suppliment'];
		$date = (string)$postedData['date'];

		// prepare sql statement
		$statement = $db->Inst()->prepare("INSERT INTO badget(user_id, name, badget, suppliment, date) VALUES (:userID, :name, :badget, :suppliment, :date)");
		$statement->bindParam(':userID', $loginID, PDO::PARAM_INT);
		$statement->bindParam(':name', $name, PDO::PARAM_STR);
		$statement->bindParam(':badget', $value, PDO::PARAM_INT);
		$statement->bindParam(':suppliment', $suppliment, PDO::PARAM_STR);
		$statement->bindParam(':date', $date, PDO::PARAM_STR);

		$statement->execute();

		// add the added item's id into the return data
		$postedData['id'] = $db->Inst()->lastInsertId();

		print json_encode($postedData);
	}
?>