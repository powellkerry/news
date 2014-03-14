var app = angular.module('topnews', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: '/views/orgs.html',
            controller: 'OrgController'
        }).
        when('/:org_id/:org_name', {
            templateUrl: '/views/feeds.html',
            controller: 'FeedsController'
        }).
        when('/:org_id/article/show', {
            templateUrl: '/views/article.html',
            controller: 'ArticleController'
        });
});

app.controller('AppController', function ($scope) {
    $('.view-container').height($(window).height() - $('.site-header').height());

});


