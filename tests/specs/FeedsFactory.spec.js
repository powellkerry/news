describe('FeedsFactory', function () {
    beforeEach(module('topnews'));
    it('should set the selected feed', inject(function ($controller, $injector) {
        var factory = $injector.get('FeedsFactory');

        factory.setSelectedFeed('Test');

        expect(factory.getSelectedFeed()).toEqual('Test');
    }));
});