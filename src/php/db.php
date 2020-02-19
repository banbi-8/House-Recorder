<?php
	class DB {
		function __construct () {
			$dsn = 'mysql:dbname=house_recorder;host=localhost;charset=utf8mb4';
			$user = 'mamp';
			$pass = 'root';
	
			try {
				$this->$dbh = new PDO($dsn, $user, $pass);
			} catch (PDOException $err) {
				print('Error:'.$err->getMessage());
			}	
		}

		function __destruct () {
			$this->$dbh = null;
		}

		function Inst () {
			return $this->$dbh;
		}

		private $dbh;
	}
?>