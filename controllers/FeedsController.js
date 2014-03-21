var app = angular.module('topnews');

app.controller('FeedsController', function ($scope, $routeParams, OrgFactory, FeedsFactory, ArticleFactory) {
    $scope.org = OrgFactory.getCurrentOrg();
    if (!$scope.org) {
        window.history.back();
    }
    $scope.expandedFeed = null;
    $scope.selectedIndex = null;

    $scope.loadFeeds = function (org_id) {
        FeedsFactory.read(org_id, function (data) {
            $scope.feeds = data;
            var selectedFeed = FeedsFactory.getCurrentFeed(),
                found = false;
            if (selectedFeed) {
                angular.forEach(data, function (feed, index) {
                    if (feed.feed_id === selectedFeed.feed_id) {
                        $scope.selectedIndex = index;
                        found = true;
                        setTimeout(function () {
                            $($('header.collapsed')[$scope.selectedIndex]).trigger('click');
                        }, 500);
                    }
                });
                if (!found) {
                    setTimeout(function () {
                        $($('header.collapsed')[0]).trigger('click');
                    }, 500);
                }
            } else {
                setTimeout(function () {
                    $($('header.collapsed')[0]).trigger('click');
                }, 500);
            }
        });
    };

    $scope.loadRSS = function (feed, $event) {
        var $target = $($event.currentTarget);
        if ($target.hasClass('expanded')) {
            $target.removeClass('expanded');
            $target.addClass('collapsed');
            $target.siblings().hide();
            $scope.expandedFeed = null;
            feed.articles = [];
        } else {
            if ($scope.expandedFeed !== null) {
                $('header.expanded').addClass('collapsed');
                $('header.expanded').siblings().hide();
                $('header.expanded').removeClass('expanded');
                $scope.expandedFeed.articles = [];
            }

            $target.removeClass('collapsed');
            $target.addClass('expanded');
            $target.siblings().show();
            FeedsFactory.setCurrentFeed(feed);
            feed.articles = FeedsFactory.loadFeeds(feed.feed_url, function (data) {
                feed.articles = data;
                angular.forEach(feed.articles, function (article) {
                    article.publishedDate = new Date(article.publishedDate);
                    article.fullTitle = article.title;
                    if (article.title.length > 40) {
                        article.title = article.title.substr(0, 40) + '...';

                    }
                    if (article.contentSnippet.length > 90) {
                        article.contentSnippet = article.contentSnippet.substr(0, 90) + '...';
                    }
                });
                $scope.expandedFeed = feed;

                var selectedArticle = ArticleFactory.getCurrentArticle();
                if (selectedArticle) {
                    angular.forEach(feed.articles, function (article, index) {
                        if (article.link === selectedArticle.link) {
                            setTimeout(function () {
                                $('html, body').animate({
                                    scrollTop: $($('a.article')[index]).offset().top
                                }, 500);
                            }, 500);
                        }
                        ArticleFactory.setCurrentArticle(null);
                    });
                }
            });
        }
    };

    $scope.getThumb = function (article) {
        var mediaGroupContents =  article.mediaGroups[0].contents[0],
            url = '',
            width = null;
        if (mediaGroupContents.thumbnails) {
            url = mediaGroupContents.thumbnails[0].url;
        } else {
            angular.forEach(article.mediaGroups[0].contents, function (media) {
                if (media.width) {
                    if (!width || media.width < width) {
                        width = media.width;
                        url = media.url;
                    }
                }
            });
        }
        return url;
    };

    $scope.setCurrentArticle = function (article, feed) {
        if (!article.mediaGroups) {
            article.mediaGroups = "";
        }
        article.category_id = feed.category_id;
        ArticleFactory.submitArticle(article, $scope.org.org_id, feed.feed_id, function (data) {
            article.article_id = data[0].article_id;
            ArticleFactory.setCurrentArticle(article);
            $scope.redirect('#!/article/' + data[0].article_id);
        });
    };

    $scope.redirect = function (location) {
        window.location = location;
    };
    $scope.loadFeeds($scope.org.org_id);

});