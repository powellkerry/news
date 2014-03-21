<?php

include_once('db.php');

class Articles {
    function create($article, $org_id, $feed_id) {
        $db = new db();
        $connection = $db->connect();

        $stmt = $connection->prepare(
            "INSERT INTO news_articles(org_id, feed_id, category_id, title, publishedDate, mediaGroups, contentSnippet, link)
             VALUES (:org_id, :feed_id, :category_id, :title, :publishedDate, :mediaGroups, :contentSnippet, :link)"
        );

        $stmt->execute(array(
            'org_id'=>$org_id,
            'feed_id'=>$feed_id,
            'category_id'=>$article->category_id,
            'title'=>$article->title,
            'publishedDate'=>$article->publishedDate,
            'mediaGroups'=>json_encode($article->mediaGroups),
            'contentSnippet'=>$article->contentSnippet,
            'link'=>$article->link
        ));
    }

    function readArticle($article_id) {
        $db = new db();
        $connection = $db->connect();
        $stmt = $connection->prepare(
            "SELECT a.*, AVG(((10 - f.bias)+f.quality+f.relevance)/3) AS avgRank, c.category_name,
             AVG(f.bias) AS bias, AVG(f.quality) AS quality, AVG(f.relevance) AS relevance, COUNT(f.feedback_id) AS popularity
             FROM news_articles a
             LEFT JOIN news_feedback f ON (a.article_id = f.article_id)
             LEFT JOIN news_categories c ON (c.category_id = a.category_id)
             WHERE a.article_id= :article_id
             GROUP BY a.article_id, a.org_id, a.title, a.publishedDate, a.mediaGroups, a.contentSnippet, a.link, c.category_name
             ORDER BY avgRank DESC, publishedDate DESC"
        );
        $stmt->execute(array('article_id' => $article_id));
        $db->sendResults($stmt);
    }

    function read() {
        $db = new db();
        $connection = $db->connect();
        $stmt = $connection->prepare(
            "SELECT a.*, AVG(((10 - f.bias)+f.quality+f.relevance)/3) AS avgRank, c.category_name,
             AVG(10-f.bias) AS bias, AVG(f.quality) AS quality, AVG(f.relevance) AS relevance, COUNT(f.feedback_id) AS popularity
             FROM news_articles a
             LEFT JOIN news_feedback f ON (a.article_id = f.article_id)
             LEFT JOIN news_categories c ON (c.category_id = a.category_id)
             WHERE publishedDate BETWEEN (NOW() - INTERVAL 7 DAY) AND NOW()
             GROUP BY a.article_id, a.org_id, a.title, a.publishedDate, a.mediaGroups, a.contentSnippet, a.link, c.category_name
             ORDER BY category_name, avgRank DESC, publishedDate DESC"
        );
        $stmt->execute();
        $db->sendResults($stmt);
    }

    function exists($article) {
        $db = new db();
        $connection = $db->connect();
        $stmt = $connection->prepare("SELECT article_id FROM news_articles WHERE link=:link");
        $stmt->execute(array('link' => $article->link));
        return $stmt->fetch(PDO::FETCH_ASSOC)['article_id'];
    }
}