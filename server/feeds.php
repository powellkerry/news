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

    function readBySection() {
        $db = new db();
        $connection = $db->connect();
        $stmt = $connection->prepare("SELECT f.feed_id, f.feed_url, o.org_name, o.org_id, c.category_id, c.category_name
                                      FROM news_org_feeds f
                                      JOIN news_orgs o ON(o.org_id=f.org_id)
                                      JOIN news_categories c ON(c.category_id = f.category_id)
                                      ORDER BY c.category_name");
        $stmt->execute();
        $db->sendResults($stmt);
    }
}