var app = angular.module('topnews');

app.controller('FeedsController', function ($scope, $routeParams, OrgFactory, FeedsFactory, ArticleFactory) {
    $scope.org = OrgFactory.getCurrentOrg();
    if (!$scope.org) {
        window.history.back();
    }
    $scope.expandedFeed = null;
    $scope.selectedIndex = null;
    $scope.isReturn = false;

    $scope.loadFeeds = function (org_id) {
        FeedsFactory.read(org_id, function (data) {
            $scope.feeds = data;
            var selectedFeed = FeedsFactory.getSelectedFeed();
            if (selectedFeed) {

                angular.forEach(data, function (feed, index) {
                    if (feed.feed_id === selectedFeed.feed_id) {
                        $scope.selectedIndex = index;
                        setTimeout(function () {
                            $($('header.collapsed')[$scope.selectedIndex]).trigger('click');
                        }, 500);
                        $scope.isReturn = true;
                    }
                });
            }
        });
    };

    $scope.loadRSS = function (feed, $event) {
        var $target = $($event.currentTarget);
        if ($target.hasClass('expanded')) {
            $target.removeClass('expanded');
            $target.addClass('collapsed');
            $scope.expandedFeed = null;
            feed.articles = [];
        } else {
            if ($scope.expandedFeed !== null) {
                $('header.expanded').addClass('collapsed');
                $('header.expanded').removeClass('expanded');
                $scope.expandedFeed.articles = [];
            }

            $target.removeClass('collapsed');
            $target.addClass('expanded');
            FeedsFactory.setSelectedFeed(feed);
            feed.articles = FeedsFactory.loadFeeds(feed.feed_url, function (data) {
                feed.articles = data;
                angular.forEach(feed.articles, function (article) {
                    article.publishedDate = new Date(article.publishedDate);
                });
                $scope.expandedFeed = feed;

                if ($scope.isReturn) {
                    var selectedArticle = ArticleFactory.getCurrentArticle();
                    angular.forEach(feed.articles, function (article, index) {
                        if (article.link === selectedArticle.link) {
                            setTimeout(function () {
                                $('html, body').animate({
                                    scrollTop: $($('a.article')[index]).offset().top
                                }, 500);
                            }, 500);
                        }
                    });
                    $scope.isReturn  = false;
                }
            });
        }
    };

    $scope.setCurrentArticle = function (article) {
        ArticleFactory.setCurrentArticle(article);
        $scope.redirect('#!/article');
    };

    $scope.redirect = function (location) {
        window.location = location;
    };

    $scope.loadFeeds($scope.org.org_id);

});