<?php

include_once('db.php');

class Feeds {

    function read($org_id) {
        $db = new db();
        $connection = $db->connect();
        $stmt = $connection->prepare("SELECT * FROM news_org_feeds WHERE org_id=:org_id ORDER BY feed_name;");
        $stmt->execute(array('org_id' => $org_id));
        $db->sendResults($stmt);
    }

}