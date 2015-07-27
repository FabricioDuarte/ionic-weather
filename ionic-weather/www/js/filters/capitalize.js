angular.module('ionicWeather.filters').filter('capitalize', function() {
    return function(input) {
        if (input != undefined) {
            return input.charAt(0).toUpperCase() + input.substr(1).toLowerCase();
        } else {
            return "";
        }
    }
});
