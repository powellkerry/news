var app = angular.module('topnews');

app.factory('CategoryFactory', function () {
    return {
        setCurrentCategories: function (categories) {
            window.localStorage.setItem('currentCategories', JSON.stringify(categories));
        },
        getCurrentCategories: function () {
            return JSON.parse(window.localStorage.getItem('currentCategories'));
        },
        setAllCategories: function (categories) {
            window.localStorage.setItem('allCategories', JSON.stringify(categories));
        },
        getAllCategories: function () {
            return JSON.parse(window.localStorage.getItem('allCategories'));
        }
    };
});