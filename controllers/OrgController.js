var app = angular.module('topnews');

app.controller('OrgController', function ($scope, $routeParams, $location, OrgFactory, ArticleFactory) {
    $scope.orgs = [];
    $scope.articles = [];
    $scope.categories = [];
    $scope.sortBy = 'avgRank';

    $scope.sortDirection = function () {
        var isASC = true;
        if ($scope.sortBy === 'bias') {
            isASC = false;
        }
        return isASC;
    };

    $scope.loadOrgs = function () {
        OrgFactory.read(function (data) {
            $scope.orgs = data;
        });
    };

    $scope.loadArticles = function () {
        ArticleFactory.loadArticles(function (data) {
            $scope.articles = data;
            var selectedArticle = ArticleFactory.getCurrentArticle();
            angular.forEach($scope.articles, function (article, index) {
                article.mediaGroups = JSON.parse(article.mediaGroups);
                if ($scope.categories.indexOf(article.category_name) === -1) {
                    $scope.categories.push(article.category_name);
                }
                var match = article.publishedDate.match(/^(\d+)-(\d+)-(\d+) (\d+)\:(\d+)\:(\d+)$/);
                article.publishedDate = new Date(match[1], match[2] - 1, match[3], match[4], match[5], match[6]);

                if (selectedArticle && article.link === selectedArticle.link) {
                    setTimeout(function () {
                        $('html, body').animate({
                            scrollTop: $($('a.article')[index]).offset().top
                        }, 500);
                        ArticleFactory.setCurrentArticle(null);
                    }, 1000);
                }
            });

            setTimeout(function () {
                $($('header.collapsed')[0]).trigger('click');
            }, 500);
        });
    };

    $scope.toggleCategory = function ($event) {
        $target = $($event.currentTarget);
        if ($target.hasClass('expanded')) {
            $target.removeClass('expanded');
            $target.addClass('collapsed');
            $target.siblings().hide();
        } else {
            if ($('header.expanded').length > 0) {
                $('header.expanded').addClass('collapsed');
                $('header.expanded').siblings().hide();
                $('header.expanded').removeClass('expanded');
            }
            $target.removeClass('collapsed');
            $target.addClass('expanded');
            $target.siblings().show();
        }
    };

    $scope.toggle = function ($event, section) {
        $event.preventDefault();
        $('.toggle button.selected').removeClass('selected');
        var hash = 'home/' + $($event.target).attr('class');
        if (window.location.hash !== hash) {
            $location.path(hash).replace();
        }
        $($event.target).addClass('selected');
        $('section.toggle').hide();
        $('#' + section).show();
    };

    $scope.setCurrentArticle = function (article) {
        ArticleFactory.setCurrentArticle(article);
        window.location = '/#!/article/' + article.article_id;
    };

    $scope.setCurrentOrg = function (org) {
        OrgFactory.setCurrentOrg(org);
        window.location = '#!/org';
    };

    $scope.getRank = function (article) {
        var value = article[$scope.sortBy],
            result = Math.round(value * 10) / 10;
        return result === 0 ? '-' : result;
    };

    $scope.loadOrgs();
    $scope.loadArticles();
    if ($routeParams.toggle) {
        setTimeout(function () {
            $('button.' + $routeParams.toggle).trigger('click');
        }, 500);
    }
});