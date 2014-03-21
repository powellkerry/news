var app = angular.module('topnews', ['ngRoute', 'ngTouch']);

app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.
        hashPrefix('!');

    $routeProvider.
        when('/', {
            templateUrl: '/views/orgs.html',
            controller: 'OrgController',
            title: 'Home'
        }).
        when('/home/:toggle', {
            templateUrl: '/views/orgs.html',
            controller: 'OrgController',
            title: 'Home'
        }).
        when('/org', {
            templateUrl: '/views/feeds.html',
            controller: 'FeedsController',
            title: 'RSS Feed'
        }).
        when('/article', {
            templateUrl: '/views/article.html',
            controller: 'ArticleController',
            title: 'Article'
        }).
        when('/article/:article_id', {
            templateUrl: '/views/article.html',
            controller: 'ArticleController',
            title: 'Article'
        });
});

app.controller('AppController', function ($scope, BreadcrumbFactory, MobileFactory) {
    $scope.breadcrumbs = [];
    $scope.$on('$routeChangeSuccess', function (scope, route) {
        BreadcrumbFactory.setUrl(window.location.hash);
        $scope.breadcrumbs = BreadcrumbFactory.getBreadCrumb();

    });

    $scope.openSocial = function (url) {
        window.open(url, '_blank', 'modal=yes');
    };

    $scope.isIos = function() {
        return MobileFactory.isIos();
    };

    $scope.navigate = function (direction) {
        if (direction === 'back') {
            history.back();
        } else {
            history.forward();
        }
    };
});


