<?php
	function getAllUsers(&$db) {
		$sql = 'select * from user';
			
		$user = array();
		foreach($db->Inst()->query($sql) as $row) {
			$user[] = array(
				'id'=>$row['user_id'],
				'name'=>$row['user_name'],
				'password'=>$row['password']
			);
		}
		print json_encode($user);	
	}

	require_once('db.php');

	$tableName = $_GET['tableName'];

	$db = new DB();

	switch ($tableName) {
		case 'user':
			getAllUsers($db);
		break;
		default:
			echo '指定したテーブルへの処理が存在しません';
	}

	exit();
?>