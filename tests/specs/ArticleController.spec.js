describe('ArticleController', function () {
    beforeEach(module('topnews'));
    it('should set org_id from routeParams', inject(function ($controller, $injector) {
        var scope = {},
            routeParams = {org_id: '123'},
            articleFactory = {getCurrentArticle: function () {return {link: 'fake'}; }};

        $controller('ArticleController', {$scope: scope, $routeParams: routeParams, ArticleFactory: articleFactory});

        expect(scope.org_id).toEqual(routeParams.org_id);
    }));
    it('should set url and feedback', inject(function ($controller, $injector) {
        var scope = {},
            routeParams = {org_id: '123'},
            articleFactory = {getCurrentArticle: function () {return {link: 'fake'}; }};

        $controller('ArticleController', {$scope: scope, $routeParams: routeParams, ArticleFactory: articleFactory});

        expect(scope.url).toBeDefined();
        expect(scope.feedback).toBeDefined();
    }));
    it('should call submitFeedback when submit is called', inject(function ($controller, $injector) {
        var scope = {},
            articleFactory = $injector.get('ArticleFactory');

        articleFactory.setCurrentArticle({link: 'fake'});
        spyOn(articleFactory, 'submitFeedback');
        $controller('ArticleController', {$scope: scope});

        scope.submit();
        expect(articleFactory.submitFeedback).toHaveBeenCalled();
    }));
});