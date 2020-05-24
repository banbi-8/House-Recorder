<?php
	session_start();
	require_once('db.php');

	$reqType = $_SERVER["REQUEST_METHOD"];
	switch ($reqType) {
		case 'GET':
			$db = new DB();
			$id = $_SESSION['LOGIN_ID'];
			$sql = "select * from user where id='$id'";

			$stmt = $db->Inst()->query($sql);
			$result = $stmt->fetch();
			print_r($result['name']);
			break;
		case 'POST':
			$method = $_POST['method'];

			if ($method == 'set') {
				$_SESSION['LOGIN_ID'] = $_POST['id'];
				$_SESSION['LOGIN_NAME'] = $_POST['name'];
			
				print_r($_SESSION);
				echo 'ログインユーザーの情報を格納しました';	
			} else {
				$_SESSION['LOGIN_ID'] = '';
				$_SESSION['LOGIN_NAME'] = '';
			
				echo 'ログインユーザーの情報を削除しました';
			}
			break;
	}

	exit();
?>