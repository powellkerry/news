var app = angular.module('topnews');

app.factory('ArticleFactory', function ($http) {
    return {
        setCurrentArticle: function (article) {
            if (article === null) {
                window.localStorage.removeItem('currentArticle');
            } else {
                window.localStorage.setItem('currentArticle', JSON.stringify(article));
            }
        },
        getCurrentArticle: function () {
            var article = false;
            if (window.localStorage.getItem('currentArticle') !== 'null') {
                article = JSON.parse(window.localStorage.getItem('currentArticle'));
            }
            return article;
        },
        loadArticle: function (article_id, callback) {
            $http.post('server/request.php?action=loadArticle', {article_id: article_id}).success(callback);
        },
        loadArticles: function (callback) {
            $http.get('server/request.php?action=loadArticles').success(callback);
        },
        submitArticle: function (article, org_id, feed_id, callback) {
            $http.post('server/request.php?action=submitArticle', {article: article, org_id: org_id, feed_id: feed_id}).success(callback);
        },
        submitFeedback: function (feedback, article_id, org_id, callback) {
            $http.post('server/request.php?action=submitFeedback', {feedback: feedback, article_id: article_id, org_id: org_id}).success(callback);
        }
    };
});