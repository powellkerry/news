var app = angular.module('topnews');

app.factory('MobileFactory', function () {
    return {
        isMobile: function () {
            return (navigator.userAgent.match(/Android/i) ||
                navigator.userAgent.match(/BlackBerry/i) ||
                navigator.userAgent.match(/iPhone|iPad|iPod/i) ||
                navigator.userAgent.match(/Opera Mini/i) ||
                navigator.userAgent.match(/IEMobile/i)) !== null;
        },
        isIos: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i) !== null;
        }
    };
});