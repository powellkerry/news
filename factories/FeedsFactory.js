var app = angular.module('topnews');

app.factory('FeedsFactory', function ($http) {
    return {
        setCurrentFeed: function (feed) {
            window.localStorage.setItem('currentFeed', JSON.stringify(feed));
        },
        getCurrentFeed: function () {
            return JSON.parse(window.localStorage.getItem('currentFeed'));
        },
        read: function (org_id, callback) {
            $http.post('../server/request.php?action=readFeeds', {org_id: org_id}).success(callback);
        },
        loadFeeds: function (url, callback) {
            $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url)).then(function (response) {
                callback(response.data.responseData.feed.entries);
            });
        },
        loadFeedsBySection: function (callback) {
            var me = this;
            $http.post('../server/request.php?action=readFeedsBySection').success(function (data) {
                var result = [];
                angular.forEach(data, function (feed, index) {
                    me.loadFeeds(feed.feed_url, function (feedResult) {
                        result.push({
                            category_name: feed.category_name,
                            category_id: feed.category_id,
                            org_name: feed.org_name,
                            org_id: feed.org_id,
                            feed_id: feed.feed_id,
                            article: feedResult[1]
                        });
                        if (index === data.length - 1) {
                            callback(result);
                        }
                    });
                });
            });
        }
    };
});