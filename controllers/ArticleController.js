var app = angular.module('topnews');

app.controller('ArticleController', function ($scope, $routeParams, $sce, OrgFactory, ArticleFactory) {
    $('.view-container').css('max-height', ($(window).height() - $('.site-header').height() - 34) + 'px');
    $('.view-container').css('height', ($(window).height() - $('.site-header').height() - 34) + 'px');

    $scope.org_id = OrgFactory.getCurrentOrg().org_id;
    $scope.article = ArticleFactory.getCurrentArticle();
    if (!$scope.article || !$scope.article.link) {
        window.location = '/#/';
    } else {
        $scope.url = $sce.trustAsResourceUrl($scope.article.link);
        $scope.feedback = {
            bias: 5,
            relevance: 5,
            quality: 5
        };

        $scope.submit = function () {
            if (!$scope.article.mediaGroups) {
                $scope.article.mediaGroups = "";
            }
            ArticleFactory.submitFeedback($scope.feedback, $scope.article, $scope.org_id, function () {
                window.history.back();
            });
        };

        $scope.toggle = function ($event) {
            if ($($event.target).hasClass('expanded')) {
                $($event.target).removeClass('expanded');
                $('form.dropdown').removeClass('visible');
            } else {
                $($event.target).addClass('expanded');
                $('form.dropdown').addClass('visible');
            }
        };
    }
});