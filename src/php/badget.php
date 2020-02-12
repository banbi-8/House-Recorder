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
		case 'DELETE':
			deleteBadgetItem();
	}

	exit();

	function getAllBadgetItem() {
		$db = new DB();
		$uid = $_SESSION['LOGIN_ID'];
		$sql = "select * from badget where uid='$uid'";
			
		$res = array();
		foreach($db->Inst()->query($sql) as $row) {
			$res[] = array(
				'id'=>$row['id'],
				'name'=>$row['name'],
				'value'=>$row['value'],
				'date'=>$row['date'],
				'memo'=>$row['memo']
			);
		}

		print json_encode($res);	
	}
	
	function updateBadgetItem() {
		$db = new DB();
		$putData = json_decode(file_get_contents('php://input'), TRUE);

		// parse data
		$bid = (int)$putData['id'];
		$name = (string)$putData['name'];
		$value = (int)$putData['value'];
		$memo = (string)$putData['memo'];
		$date = (string)$putData['date'];

		// prepare sql statement
		$statement = $db->Inst()->prepare("UPDATE	badget SET name=:name, value=:value, memo=:memo, date=:date WHERE id=:bid");
		$statement->bindParam(':name', $name, PDO::PARAM_STR);
		$statement->bindParam(':value', $value, PDO::PARAM_INT);
		$statement->bindParam(':memo', $memo, PDO::PARAM_STR);
		$statement->bindParam(':date', $date, PDO::PARAM_STR);
		$statement->bindParam(':bid', $bid, PDO::PARAM_INT);

		$statement->execute();

		print json_encode($putData);
	}

	function saveBadgetItem() {
		$db = new DB();
		$postedData = json_decode(file_get_contents('php://input'), TRUE);

		// parse data
		$uid = (int)$_SESSION['LOGIN_ID'];
		$name = (string)$postedData['name'];
		$value = (int)$postedData['value'];
		$memo = (string)$postedData['memo'];
		$date = (string)$postedData['date'];

		// prepare sql statement
		$statement = $db->Inst()->prepare("INSERT INTO badget(uid, name, value, memo, date) VALUES (:uid, :name, :value, :memo, :date)");
		$statement->bindParam(':uid', $uid, PDO::PARAM_INT);
		$statement->bindParam(':name', $name, PDO::PARAM_STR);
		$statement->bindParam(':value', $value, PDO::PARAM_INT);
		$statement->bindParam(':memo', $memo, PDO::PARAM_STR);
		$statement->bindParam(':date', $date, PDO::PARAM_STR);

		$statement->execute();

		// add the added item's id into the return data
		$postedData['id'] = $db->Inst()->lastInsertId();

		print json_encode($postedData);
	}

	function deleteBadgetItem () {
		$db = new DB();
		$delid = json_decode(file_get_contents('php://input'), TRUE);

		// prepare sql statement
		$statement = $db->Inst()->prepare("DELETE FROM badget where id=:delid");
		$statement->bindParam(':delid', $delid, PDO::PARAM_INT);
		$statement->execute();

		print json_encode($delid);
	}
?>