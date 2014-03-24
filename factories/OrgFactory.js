var app = angular.module('topnews');

app.factory('OrgFactory', function ($http) {
    return {
        setCurrentOrg: function (org) {
            window.localStorage.setItem('currentOrg', JSON.stringify(org));
        },
        getCurrentOrg: function () {
            return JSON.parse(window.localStorage.getItem('currentOrg'));
        },
        setCurrentCategories: function (categories) {
            window.localStorage.setItem('currentCategories', JSON.stringify(categories));
        },
        getCurrentCategories: function () {
            return JSON.parse(window.localStorage.getItem('currentCategories'));
        },
        loadOrg: function (article_id, callback) {
            $http.post('server/request.php?action=loadOrg', {article_id: article_id}).success(callback);
        },
        read: function (callback) {
            $http.get('server/request.php?action=readOrgs').success(callback);
        }
    };
});