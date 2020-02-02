<?php
	session_start();

	$_SESSION['LOGIN_ID'] = $_POST['id'];
	$_SESSION['LOGIN_NAME'] = $_POST['name'];

	print_r($_SESSION);
	echo 'ログインユーザーの情報を格納しました';
	exit();
?>