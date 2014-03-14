var app = angular.module('topnews');

app.factory('OrgFactory', function ($http) {
    return {
        read: function (callback) {
            $http.get('server/request.php?action=readOrgs').success(callback);
        }
    };
});