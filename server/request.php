<?php

include_once('orgs.php');
include_once('feeds.php');
include_once('articles.php');
include_once('feedback.php');

$post = json_decode(file_get_contents('php://input'), false);
parse_str($_SERVER['QUERY_STRING']);

switch ($action) {
    case 'readOrgs' :
        $orgs = new Orgs();
        $orgs->read();
        break;
    case 'readFeeds' :
        $feeds = new Feeds();
        $feeds->read($post->org_id);
        break;
    case 'submitFeedback' :
        $articles = new Articles();
        $article_id = $articles->exists($post->article);

        if ($article_id == null) {
            $articles->create($post->article, $post->org_id);
            $article_id = $articles->exists($post->article);
        }

        $feedback = new Feedback();
        $feedback->create($article_id, $post->feedback);
        break;
    case 'loadArticles' :
        $articles = new Articles();
        $articles->read();
        break;
}
