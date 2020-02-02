<?php
	session_start();
	require_once('db.php');

	$reqType = $_SERVER["REQUEST_METHOD"];
	switch ($reqType) {
		case 'GET':
		break;
		case 'PUT': // already exist model
			updateBadget();
		break;
		case 'POST': // model is not saved yet
			saveBadget();
		break;
	}

	exit();

	function updateBadget() {
		$db = new DB();
		$putData = json_decode(file_get_contents('php://input'), TRUE);

		// parse data
		$badgetID = (int)$putData['id'];
		$badgetName = (string)$putData['name'];
		$badget = (int)$putData['value'];
		$suppliment = (string)$putData['suppliment'];
		$date = (string)$putData['date'];

		// prepare sql statement
		$statement = $db->Inst()->prepare("UPDATE	badget SET name=:name, badget=:badget, suppliment=:suppliment, date=:date WHERE badget_id=:badgetID");
		$statement->bindParam(':name', $badgetName, PDO::PARAM_STR);
		$statement->bindParam(':badget', $badget, PDO::PARAM_INT);
		$statement->bindParam(':suppliment', $suppliment, PDO::PARAM_STR);
		$statement->bindParam(':date', $date, PDO::PARAM_STR);
		$statement->bindParam(':badgetID', $badgetID, PDO::PARAM_INT);

		$statement->execute();

		print json_encode($putData);
	}

	function saveBadget() {
		$db = new DB();
		$postedData = json_decode(file_get_contents('php://input'), TRUE);

		// parse data
		$loginID = (int)$_SESSION['LOGIN_ID'];
		$badgetName = (string)$postedData['name'];
		$badget = (int)$postedData['value'];
		$suppliment = (string)$postedData['suppliment'];
		$date = (string)$postedData['date'];

		// prepare sql statement
		$statement = $db->Inst()->prepare("INSERT INTO badget(user_id, name, badget, suppliment, date) VALUES (:userID, :name, :badget, :suppliment, :date)");
		$statement->bindParam(':userID', $loginID, PDO::PARAM_INT);
		$statement->bindParam(':name', $badgetName, PDO::PARAM_STR);
		$statement->bindParam(':badget', $badget, PDO::PARAM_INT);
		$statement->bindParam(':suppliment', $suppliment, PDO::PARAM_STR);
		$statement->bindParam(':date', $date, PDO::PARAM_STR);

		$statement->execute();

		// add the added item's id into the return data
		$postedData['id'] = $db->Inst()->lastInsertId();

		print json_encode($postedData);
	}
?>