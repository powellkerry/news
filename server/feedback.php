<?php

include_once('db.php');

class Feedback {
    function create($article_id, $feedback) {
        $db = new db();
        $connection = $db->connect();
        $sql = "INSERT INTO news_feedback(article_id, bias, quality, relevance)
                VALUES ('".$article_id."','".$feedback->bias."','".$feedback->quality."','".$feedback->relevance."')";
        mysqli_query($connection, $sql);
        $db->sendResults('{"success": true}', $connection);
    }
}