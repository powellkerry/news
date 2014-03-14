describe('OrgController', function () {
    beforeEach(module('topnews'));

    it('should load orgs', inject(function ($controller, $injector) {
        var scope = {},
            factory = $injector.get('OrgFactory');

        spyOn(factory, 'read');
        $controller('OrgController', {$scope: scope});
        expect(factory.read).toHaveBeenCalled();
    }));

    it('should call loadArticles when loadArticles is called', inject(function ($controller, $injector) {
        var scope = {},
            factory = $injector.get('ArticleFactory');

        spyOn(factory, 'loadArticles');
        $controller('OrgController', {$scope: scope});
        scope.loadArticles();

        expect(factory.loadArticles).toHaveBeenCalled();
    }));
});