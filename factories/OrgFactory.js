var app = angular.module('topnews');

app.factory('OrgFactory', function ($http) {
    return {
        setCurrentOrg: function (org) {
            window.localStorage.setItem('org', JSON.stringify(org));
        },
        getCurrentOrg: function () {
            return JSON.parse(window.localStorage.getItem('org'));
        },
        read: function (callback) {
            $http.get('server/request.php?action=readOrgs').success(callback);
        }
    };
});