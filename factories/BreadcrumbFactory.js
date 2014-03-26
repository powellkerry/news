var app = angular.module('topnews');

app.factory('BreadcrumbFactory', function() {
    var history = {
        home: {
            active: true,
            url: '/#/',
            origUrl: '/#/',
            title: 'Home',
            order: 0
        },
        org: {
            active: false,
            url: '/#/feed',
            origUrl: '/#/feed',
            title: 'RSS Feed',
            order: 1
        },
        article: {
            active: false,
            url: '/#/article',
            origUrl: '/#/article',
            title: 'Article',
            order: 2
        }
    };
    return {
        setUrl: function (url) {
            var urlPart = url.split('/'),
                key = urlPart[1] === '' ? 'home' : urlPart[1],
                order = history[key].order;
            history[key].url = url;
            history[key].active = true;
            angular.forEach(history, function (history) {
                if (history.order > order) {
                    history.active = false;
                }
            });
        },
        getBreadCrumb: function () {
            var breadcrumbs = [{url: history.home.url, title: history.home.title}];
            if (history.org.active) {
                breadcrumbs.push({url: history.org.url, title: history.org.title});
            }
            if (history.article.active) {
                breadcrumbs.push({url: history.article.url, title: history.article.title});
            }
            return breadcrumbs;
        }
    };
});