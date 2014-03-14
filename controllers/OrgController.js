var app = angular.module('topnews');

app.controller('OrgController', function ($scope, OrgFactory, ArticleFactory) {
    $scope.orgs = [];
    $scope.articles = [];
    $scope.sortBy = 'avgRank';

    $scope.loadOrgs = function () {
        OrgFactory.read(function (data) {
            $scope.orgs = data;
        });
    };

    $scope.loadArticles = function () {
        ArticleFactory.loadArticles(function (data) {
            $scope.articles = data;
            angular.forEach($scope.articles, function (article) {
                article.mediaGroups = JSON.parse(article.mediaGroups);

                var match = article.publishedDate.match(/^(\d+)-(\d+)-(\d+) (\d+)\:(\d+)\:(\d+)$/);
                article.publishedDate = new Date(match[1], match[2] - 1, match[3], match[4], match[5], match[6]);
            });
        });
    };

    $scope.toggle = function ($event, section) {
        $('.toggle button.selected').removeClass('selected');
        $($event.target).addClass('selected');
        $('section.toggle').hide();
        $('#' + section).show();
    };

    $scope.setCurrentArticle = function (article) {
        ArticleFactory.setCurrentArticle(article);
        window.location = '/#/' + article.org_id + '/article/show';
    };

    $scope.loadOrgs();
    $scope.loadArticles();
});