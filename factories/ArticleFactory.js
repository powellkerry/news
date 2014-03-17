var app = angular.module('topnews');

app.factory('ArticleFactory', function ($http) {
    return {
        setCurrentArticle: function (article) {
            window.localStorage.setItem('currentArticle', JSON.stringify(article));
        },
        getCurrentArticle: function () {
            return JSON.parse(window.localStorage.getItem('currentArticle'));
        },
        loadArticles: function (callback) {
            $http.get('server/request.php?action=loadArticles').success(callback);
        },
        submitFeedback: function (feedback, article, org_id, callback) {
            $http.post('server/request.php?action=submitFeedback', {feedback: feedback, article: article, org_id: org_id}).success(callback);
        }
    };
});