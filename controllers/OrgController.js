var app = angular.module('topnews');

app.controller('OrgController', function ($scope, $routeParams, $location, CategoryFactory, OrgFactory, ArticleFactory,
                                          MobileFactory, FeedsFactory) {
    $scope.orgs = [];
    $scope.articles = [];
    $scope.sectionArticles = [];
    $scope.sectionCategories = [];
    $scope.selectedSectionCategories = [];
    $scope.selectedSectionCategory = '';
    $scope.categories = [];
    $scope.selectedCategories = [];
    $scope.sortBy = 'avgRank';
    $scope.selectedCategory = '';

    $scope.isSelectedCategory = function (category) {
        var value = false;
        if ($scope.selectedCategories.indexOf(category) !== -1) {
            value = true;
        }
        return value;
    };

    $scope.isSelectedSectionCategory = function (category) {
        var value = false;
        if ($scope.selectedSectionCategories.indexOf(category) !== -1) {
            value = true;
        }
        return value;
    };

    $scope.goToSelectedCategory = function () {

        setTimeout(function () {
            $('.' + $scope.selectedCategory).trigger('click');
            $('html, body').animate({
                scrollTop: $('.' + $scope.selectedCategory).offset().top
            }, 500);
        }, 500);
    };

    $scope.updateSelectedCategories = function ($event) {
        $check = $($event.currentTarget);
        if ($check.attr('checked') === "checked" && $scope.selectedCategories.indexOf($check.attr('id')) !== -1) {
            $scope.selectedCategories.splice($scope.selectedCategories.indexOf($check.attr('id')), 1);
        } else {
            $scope.selectedCategories.push($check.attr('id'));
        }
        $scope.selectedCategories.sort();
        CategoryFactory.setCurrentCategories($scope.selectedCategories);
    };

    $scope.updateSelectedSectionCategories = function ($event) {
        $check = $($event.currentTarget);
        if ($check.attr('checked') === "checked" && $scope.selectedSectionCategories.indexOf($check.attr('id')) !== -1) {
            $scope.selectedSectionCategories.splice($scope.selectedSectionCategories.indexOf($check.attr('id')), 1);
        } else {
            $scope.selectedSectionCategories.push($check.attr('id'));
        }
        $scope.selectedSectionCategories.sort();
    };

    $scope.sortDirection = function () {
        var isASC = true;
        if ($scope.sortBy === 'bias') {
            isASC = false;
        }
        return isASC;
    };

    $scope.toggleOptions = function ($event) {
        var $element = $($event.currentTarget),
            $options = $('.' + $element.attr('rel'));

        $options.css('top', $($event.currentTarget).offset().top + 50);
        if (MobileFactory.isMobile()) {
            $options.css('left', $($event.currentTarget).offset().left - $options.width() + 25);
        } else {
            $options.css('left', $($event.currentTarget).offset().left - $options.width() + 20);
        }

        if ($element.hasClass('active')) {
            $element.removeClass('active');
            $options.removeClass('visible');
            $options.addClass('hidden');
        } else {
            $element.addClass('active');
            $options.addClass('visible');
            $options.removeClass('hidden');
        }
    };

    $scope.loadOrgs = function () {
        OrgFactory.read(function (data) {
            $scope.orgs = data;
        });
    };

    $scope.loadArticles = function () {
        ArticleFactory.loadArticles(function (data) {
            $scope.articles = data;
            if ($scope.articles.length === 0) {
                setTimeout(function () {
                    $('.toolbar .toggle .org').trigger('click');
                }, 500);
            } else {
                var selectedArticle = ArticleFactory.getCurrentArticle(),
                    prevCategories = CategoryFactory.getCurrentCategories(),
                    existingCategories = CategoryFactory.getAllCategories();
                angular.forEach($scope.articles, function (article, index) {
                    article.mediaGroups = JSON.parse(article.mediaGroups);
                    if ($scope.categories.indexOf(article.category_name) === -1) {
                        $scope.categories.push(article.category_name);
                        $scope.selectedCategories.push(article.category_name);
                    }
                    if (!existingCategories || existingCategories.indexOf(article.category_name) === -1) {
                        if (!existingCategories) {
                            existingCategories = [];
                        }
                        if (!prevCategories) {
                            prevCategories = [];
                        }
                        if (prevCategories.indexOf(article.category_name) === -1) {
                            prevCategories.push(article.category_name);
                        }
                        existingCategories.push(article.category_name);
                        CategoryFactory.setAllCategories(existingCategories);
                        CategoryFactory.setCurrentCategories(prevCategories);
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
                if (prevCategories) {
                    $scope.selectedCategories = prevCategories;
                }

                setTimeout(function () {
                    $($('header.collapsed')[0]).trigger('click');
                }, 500);
            }

        });
    };

    $scope.loadFeedSections = function () {
        FeedsFactory.loadFeedsBySection(function (data) {
            $scope.sectionArticles = data;
            angular.forEach(data, function (article) {
                if ($scope.selectedSectionCategories.indexOf(article.category_name) === -1) {
                    $scope.selectedSectionCategories.push(article.category_name);
                }
                if ($scope.sectionCategories.indexOf(article.category_name) === -1) {
                    $scope.sectionCategories.push(article.category_name);
                }
            });
            $('.loading').hide();

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
        if (section === 'orgs') {
            $scope.loadOrgs();
        } else if (section === 'rank') {
            $scope.loadArticles();
        } else if (section === 'section') {
            $scope.loadFeedSections();
        }
    };

    $scope.setCurrentArticle = function (article, category_id, org_id, feed_id) {
        if (article.article_id) {
            window.location = '#/article/' + article.article_id;
        } else {
            if (!article.mediaGroups) {
                article.mediaGroups = "";
            }
            article.category_id = category_id;
            ArticleFactory.submitArticle(article, org_id, feed_id, function (data) {
                article.article_id = data[0].article_id;
                ArticleFactory.setCurrentArticle(article);
                window.location = '#/article/' + data[0].article_id;
            });
        }
    };

    $scope.setCurrentOrg = function (org) {
        OrgFactory.setCurrentOrg(org);
        window.location = '#/org';
    };

    $scope.getRank = function (article) {
        var value = article[$scope.sortBy],
            result = Math.round(value * 10) / 10;
        return result === 0 ? '-' : result;
    };

    if ($routeParams.toggle) {
        setTimeout(function () {
            $('button.' + $routeParams.toggle).trigger('click');
        }, 500);
    } else {
        setTimeout(function () {
            $('button.selected').trigger('click');
        }, 500);
    }
});