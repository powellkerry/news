describe('ArticleFactory', function() {
    beforeEach(module('topnews'));
    it('should set the current article', inject(function($controller, $injector) {
        var factory = $injector.get('ArticleFactory');

        factory.setCurrentArticle('Test');
        expect(factory.getCurrentArticle()).toEqual('Test');
    }));
});