var app = angular.module('topnews', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.
        hashPrefix('!');

    $routeProvider.
        when('/', {
            templateUrl: '/views/orgs.html',
            controller: 'OrgController'
        }).
        when('/org', {
            templateUrl: '/views/feeds.html',
            controller: 'FeedsController'
        }).
        when('/article', {
            templateUrl: '/views/article.html',
            controller: 'ArticleController'
        }).
        when('/article/:article_id', {
            templateUrl: '/views/article.html',
            controller: 'ArticleController'
        });
});

app.controller('AppController', function ($scope) {
    $scope.openSocial = function (url) {
        window.open(url, '_blank', 'modal=yes');
    };
});


