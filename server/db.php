<?php

class db {
    private $user = 'web';
    private $password = 'Zr%.Sv]BO&V4';
    private $url = 'kerrywpowell.com';
    private $port = '3306';
    private $db = 'news';

    public function connect() {
        $connection = new PDO(
            'mysql:dbname='.$this->db.';host='.$this->url.':'.$this->port.';charset=utf8',
            $this->user, $this->password
        );

        $connection->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


       // $connection = mysqli_connect($this->url, $this->user, $this->password, $this->db, $this->port);

        if (mysqli_connect_errno()) {
            return false;
        } else {
            return $connection;
        }
    }

    public function sendResults($stmt) {
        if(!is_string($stmt)) {
            $myArray = array();
            foreach ($stmt as $row) {
                array_push($myArray, $row);
            }
            echo json_encode($myArray);
        } else {
            echo $stmt;
        }
    }
}