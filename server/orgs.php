<?php

include_once('db.php');

class orgs {

    function read() {
        $db = new db();
        $connection = $db->connect();
        $sql = "SELECT * FROM news.news_orgs ORDER BY org_name";

        $results = mysqli_query($connection, $sql);

        $db->sendResults($results, $connection);
    }
}