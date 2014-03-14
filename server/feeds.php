<?php

include_once('db.php');

class Feeds {

    function read($org_id) {
        $db = new db();
        $connection = $db->connect();
        $sql = "SELECT * FROM news_org_feeds WHERE org_id=".$org_id." ORDER BY feed_name;";
        $results = mysqli_query($connection, $sql);
        $db->sendResults($results, $connection);
    }

}