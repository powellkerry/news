<?php

class db {
    private $user = 'web';
    private $password = 'Zr%.Sv]BO&V4';
    private $url = 'kerrywpowell.com';
    private $port = '3306';
    private $db = 'news';

    public function connect() {
        $connection = mysqli_connect($this->url, $this->user, $this->password, $this->db, $this->port);

        if (mysqli_connect_errno()) {
            return false;
        } else {
            return $connection;
        }
    }

    public function sendResults($results, $terminateConnection) {
        if(!is_string($results)) {
            $myArray = array();
            while($row = $results->fetch_object()) {
                array_push($myArray, $row);
            }
            echo json_encode($myArray);
        } else {
            echo $results;
        }

        if ($terminateConnection != false) {
            mysqli_close($terminateConnection);
        }
    }
}