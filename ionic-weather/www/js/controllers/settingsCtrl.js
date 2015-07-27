angular.module('ionicWeather.controllers').controller('SettingsCtrl', function($scope, $translate, $filter) {
    $scope.refreshView = function() {
        $scope.title = $filter('translate')("SETTINGS");
        $scope.languageLabel = $filter('translate')("LANGUAGE");
    };

    $scope.refreshView();

    $scope.title = $filter('translate')("SETTINGS");
    $scope.languageLabel = $filter('translate')("LANGUAGE");

    $scope.language = localStorage['lang'];

    $scope.changeLanguage = function(language) {
        $translate.use(language);
        localStorage['lang'] = language;
        $scope.refreshView();
    };
});
