<?php

include_once('orgs.php');
include_once('feeds.php');
include_once('articles.php');
include_once('feedback.php');

$post = json_decode(file_get_contents('php://input'), false);
parse_str($_SERVER['QUERY_STRING']);

switch ($action) {
    case 'loadOrg' :
        $orgs = new Orgs();
        $orgs->readOrg($post->article_id);
        break;
    case 'readOrgs' :
        $orgs = new Orgs();
        $orgs->read();
        break;
    case 'readFeeds' :
        $feeds = new Feeds();
        $feeds->read($post->org_id);
        break;
    case 'readFeedsBySection' :
        $feeds = new Feeds();
        $feeds->readBySection();
        break;
    case 'submitArticle' :
        $articles = new Articles();
        $article_id = $articles->exists($post->article);

        if ($article_id == null) {
            $articles->create($post->article, $post->org_id, $post->feed_id);
            $article_id = $articles->exists($post->article);
            if ($article_id == null) {
                header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
            }
        }
        echo '[{"article_id":'.$article_id.'}]';
        break;
    case 'submitFeedback' :
        $articles = new Articles();
        $feedback = new Feedback();
        $feedback->create($post->article_id, $post->feedback);
        break;
    case 'loadArticle' :
        $articles = new Articles();
        $articles->readArticle($post->article_id);
        break;
    case 'loadArticles' :
        $articles = new Articles();
        $articles->read();
        break;
}
