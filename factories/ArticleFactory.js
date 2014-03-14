var app = angular.module('topnews');

app.factory('ArticleFactory', function ($http) {
    var currentArticle = null;
    return {
        setCurrentArticle: function (article) {
            currentArticle = article;
        },
        getCurrentArticle: function () {
            return currentArticle;
        },
        loadArticles: function (callback) {
            $http.get('server/request.php?action=loadArticles').success(callback);
        },
        submitFeedback: function (feedback, article, org_id, callback) {
            $http.post('server/request.php?action=submitFeedback', {feedback: feedback, article: article, org_id: org_id}).success(callback);
        }
    };
});