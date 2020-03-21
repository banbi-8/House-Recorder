<?php
	session_start();
	require_once('db.php');

	$reqType = $_SERVER["REQUEST_METHOD"];
	switch ($reqType) {
		case 'GET':
			getAllIncomeItem();
		break;
		case 'PUT': // already exist model
			updateIncomeItem();
		break;
		case 'POST': // model is not saved yet
			saveIncomeItem();
		break;
		case 'DELETE':
			deleteIncomeItem();
	}

	exit();

	function getAllIncomeItem() {
		$db = new DB();
		$uid = $_SESSION['LOGIN_ID'];
		$date = $_GET['date'];
		$sql = "select * from income where uid='$uid' and date='$date'";
			
		$res = array();
		foreach($db->Inst()->query($sql) as $row) {
			$res[] = array(
				'id'=>$row['id'],
				'category'=>$row['category'],
				'value'=>$row['value'],
				'date'=>$row['date'],
				'memo'=>$row['memo']
			);
		}

		print json_encode($res);	
	}
	
	function updateIncomeItem() {
		$db = new DB();
		$putData = json_decode(file_get_contents('php://input'), TRUE);

		// parse data
		$id = (int)$putData['id'];
		$name = (string)$putData['category'];
		$value = (int)$putData['value'];
		$memo = (string)$putData['memo'];
		$date = (string)$putData['date'];

		// prepare sql statement
		$statement = $db->Inst()->prepare("UPDATE	income SET category=:category, value=:value, memo=:memo, date=:date WHERE id=:id");
		$statement->bindParam(':category', $name, PDO::PARAM_STR);
		$statement->bindParam(':value', $value, PDO::PARAM_INT);
		$statement->bindParam(':memo', $memo, PDO::PARAM_STR);
		$statement->bindParam(':date', $date, PDO::PARAM_STR);
		$statement->bindParam(':id', $bid, PDO::PARAM_INT);

		$statement->execute();

		print json_encode($putData);
	}

	function saveIncomeItem() {
		$db = new DB();
		$postedData = json_decode(file_get_contents('php://input'), TRUE);

		// parse data
		$uid = (int)$_SESSION['LOGIN_ID'];
		$name = (string)$postedData['category'];
		$value = (int)$postedData['value'];
		$memo = (string)$postedData['memo'];
		$date = (string)$postedData['date'];

		// prepare sql statement
		$statement = $db->Inst()->prepare("INSERT INTO income(uid, category, value, memo, date) VALUES (:uid, :name, :value, :memo, :date)");
		$statement->bindParam(':uid', $uid, PDO::PARAM_INT);
		$statement->bindParam(':category', $name, PDO::PARAM_STR);
		$statement->bindParam(':value', $value, PDO::PARAM_INT);
		$statement->bindParam(':memo', $memo, PDO::PARAM_STR);
		$statement->bindParam(':date', $date, PDO::PARAM_STR);

		$statement->execute();

		// add the added item's id into the return data
		$postedData['id'] = $db->Inst()->lastInsertId();

		print json_encode($postedData);
	}

	function deleteIncomeItem () {
		$db = new DB();
		$delid = json_decode(file_get_contents('php://input'), TRUE);

		// prepare sql statement
		$statement = $db->Inst()->prepare("DELETE FROM income where id=:delid");
		$statement->bindParam(':delid', $delid, PDO::PARAM_INT);
		$statement->execute();

		print json_encode($delid);
	}
?>