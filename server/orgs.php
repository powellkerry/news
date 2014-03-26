<?php

include_once('db.php');

class orgs {

    function read() {
        $db = new db();
        $connection = $db->connect();
        $stmt = $connection->prepare("SELECT * FROM news.news_orgs WHERE active = true ORDER BY org_name ");
        $stmt->execute();
        $db->sendResults($stmt);
    }

    function readOrg($article_id) {
        $db = new db();
        $connection = $db->connect();
        $stmt = $connection->prepare("SELECT * FROM news.news_orgs o
                JOIN news_articles n ON (n.org_id=o.org_id) WHERE n.article_id=:article_id ORDER BY org_name");
        $stmt->execute(array('article_id' => $article_id));
        $db->sendResults($stmt);
    }
}