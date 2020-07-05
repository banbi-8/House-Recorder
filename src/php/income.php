<?php
	session_start();
	require_once('db.php');

	$reqType = $_SERVER["REQUEST_METHOD"];
	switch ($reqType) {
		case 'GET':
			getIncomeItems();
		break;
		case 'PUT': // already exist model
			updateIncomeItem();
		break;
		case 'POST': // model is not saved yet
			saveIncomeItem();
		break;
	}

	exit();

	function getIncomeItems() {
		$db = new DB();
		$uid = $_SESSION['LOGIN_ID'];
		$date = $_GET['date'];
		$sql = "select * from income where uid='$uid'";
			
		$res = array();
		foreach($db->Inst()->query($sql) as $row) {
			// $value = is_null($row['value']) ? $row['value'] : 0;
			$res[] = array(
				'id'=>$row['id'],
				'value'=>$row['value'],
				'date'=>$row['date'],
			);
		}

		print json_encode($res);	
	}
	
	function updateIncomeItem() {
		$db = new DB();
		$putData = json_decode(file_get_contents('php://input'), TRUE);

		// parse data
		$id = (int)$putData['id'];
		$value = (int)$putData['value'];
		$date = (string)$putData['date'];

		// prepare sql statement
		$statement = $db->Inst()->prepare("UPDATE	income SET value=:value, date=:date WHERE id=:id");
		$statement->bindParam(':value', $value, PDO::PARAM_INT);
		$statement->bindParam(':date', $date, PDO::PARAM_STR);
		$statement->bindParam(':id', $id, PDO::PARAM_INT);

		$statement->execute();

		print json_encode($putData);
	}

	function saveIncomeItem() {
		$db = new DB();
		$postedData = json_decode(file_get_contents('php://input'), TRUE);

		// parse data
		$uid = (int)$_SESSION['LOGIN_ID'];
		$value = (int)$postedData['value'];
		$date = (string)$postedData['date'];

		// prepare sql statement
		$statement = $db->Inst()->prepare("INSERT INTO income(uid, value, date) VALUES (:uid, :value, :date)");
		$statement->bindParam(':uid', $uid, PDO::PARAM_INT);
		$statement->bindParam(':value', $value, PDO::PARAM_INT);
		$statement->bindParam(':date', $date, PDO::PARAM_STR);

		$statement->execute();

		// add the added item's id into the return data
		$postedData['id'] = $db->Inst()->lastInsertId();

		print json_encode($postedData);
	}
?>