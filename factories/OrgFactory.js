var app = angular.module('topnews');

app.factory('OrgFactory', function ($http) {
    return {
        setCurrentOrg: function (org) {
            window.localStorage.setItem('currentOrg', JSON.stringify(org));
        },
        getCurrentOrg: function () {
            return JSON.parse(window.localStorage.getItem('currentOrg'));
        },
        loadOrg: function(article_id, callback) {
            $http.post('server/request.php?action=loadOrg', {article_id: article_id}).success(callback);
        },
        read: function (callback) {
            $http.get('server/request.php?action=readOrgs').success(callback);
        }
    };
});