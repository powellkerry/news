<?php

include_once('db.php');

class Articles {
    function create($article, $org_id) {
        $db = new db();
        $connection = $db->connect();
        $sql = "INSERT INTO news_articles(org_id, title, publishedDate, mediaGroups, contentSnippet, link)
                VALUES ('".$org_id."','".$article->title."','".$article->publishedDate."','".json_encode($article->mediaGroups)."','".$article->contentSnippet."','".$article->link."');";

        mysqli_query($connection, $sql);
        mysqli_close($connection);
    }

    function read() {
        $db = new db();
        $connection = $db->connect();
        $sql = "SELECT a.*, AVG(((10 - f.bias)+f.quality+f.relevance)/3) AS avgRank,
                AVG(10-f.bias) AS bias, AVG(f.quality) AS quality, AVG(f.relevance) AS relevance, COUNT(*) AS popularity
                FROM news_articles a
                LEFT JOIN news_feedback f ON (a.article_id = f.article_id)
                GROUP BY a.article_id, a.org_id, a.title, a.publishedDate, a.mediaGroups, a.contentSnippet, a.link
                ORDER BY avgRank DESC, publishedDate DESC";
        $result = mysqli_query($connection, $sql);
        $db->sendResults($result, $connection);
    }

    function exists($article) {
        $db = new db();
        $connection = $db->connect();
        $sql = "SELECT article_id FROM news_articles WHERE link='".$article->link."';";
        $result = mysqli_query($connection, $sql);
        mysqli_close($connection);
        return mysqli_fetch_assoc($result)['article_id'];
    }
}