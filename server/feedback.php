<?php

include_once('db.php');

class Feedback {
    function create($article_id, $feedback) {
        $db = new db();
        $connection = $db->connect();
        $stmt = $connection->prepare(
            "INSERT INTO news_feedback(article_id, bias, quality, relevance)
                VALUES (:article_id,:bias,:quality,:relevance)"
        );
        $stmt->execute(array(
            'article_id'=>$article_id,
            'bias'=>$feedback->bias,
            'quality'=>$feedback->quality,
            'relevance'=>$feedback->relevance,
        ));
        $db->sendResults('{"success": true}');
    }
}