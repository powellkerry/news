describe('FeedsController', function () {
    beforeEach(module('topnews'));

    it('should load feeds', inject(function ($controller, $injector) {
        var scope = {},
            factory = $injector.get('FeedsFactory');

        spyOn(factory, 'read');
        $controller('FeedsController', {$scope: scope});

        expect(factory.read).toHaveBeenCalled();
    }));

    it('should load articles when loadRSS is called', inject(function ($controller, $injector) {
        var scope = {},
            factory = $injector.get('FeedsFactory');

        spyOn(factory, 'loadFeeds');
        $controller('FeedsController', {$scope: scope});

        scope.loadRSS({feed_url: 'fake'}, {currentTarget: 'fake'});

        expect(factory.loadFeeds).toHaveBeenCalled();
    }));

    it('should set the current article when setCurrentArticle is called', inject(function ($controller, $injector) {
        var scope = {},
            factory = $injector.get('ArticleFactory'),
            article = {test: 'test'};

        spyOn(factory, 'setCurrentArticle');
        $controller('FeedsController', {$scope: scope});
        scope.redirect = function () { return; };
        scope.setCurrentArticle(article);
        expect(factory.setCurrentArticle).toHaveBeenCalledWith(article);
    }));
});