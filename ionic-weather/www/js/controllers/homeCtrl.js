angular.module('ionicWeather.controllers').controller('HomeCtrl', function($scope, $rootScope, $filter, WeatherService, $mdDialog, $ionicLoading, $timeout, $mdToast) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    $ionicLoading.show({
        template: 'Loading...'
    });

    $rootScope.locations = JSON.parse(localStorage['locations']);
    $rootScope.currentLocation = $rootScope.locations[0];

    $scope.title = $filter('translate')("SUMMARY");
    $scope.pullToRefreshText = $filter('translate')("PULL_TO_REFRESH");

    $scope.updateInfo = function() {
        WeatherService.getWeatherInformation($rootScope.currentLocation.value).then(function(data) {
            $scope.currentWeather = data;
            $scope.currentTemp = Math.round($scope.currentWeather.main.temp);
            $ionicLoading.hide();
            $timeout(function() {
                $scope.$broadcast('scroll.refreshComplete');
            }, 500);
        });
    };

    $scope.updateInfo();

    $scope.doRefresh = function() {
        $scope.updateInfo();
    };

    $scope.toastPosition = {
        bottom: false,
        top: true,
        left: false,
        right: true
    };
    $scope.getToastPosition = function() {
        return Object.keys($scope.toastPosition)
            .filter(function(pos) {
                return $scope.toastPosition[pos];
            })
            .join(' ');
    };

    $scope.addNewLocation = function() {

        $mdDialog.show({
                controller: 'ToastCtrl',
                templateUrl: '../../templates/dialogTemplate.html',
                parent: angular.element(document.body),
            })
            .then(function(answer) {
                var locations = JSON.parse(localStorage['locations']);
                locations.push({
                    name: answer,
                    value: answer
                });
                localStorage['locations'] = JSON.stringify(locations);
                $rootScope.locations = JSON.parse(localStorage['locations']);
                $mdToast.show(
                    $mdToast.simple()
                    .content('Se agregó correctamente.')
                    .position($scope.getToastPosition())
                    .hideDelay(1500)
                );
            }, function() {});
    };

    $scope.changeLocation = function(location) {
        $rootScope.currentLocation = location;
        $scope.updateInfo();
    };
    
}).controller('ToastCtrl', function($scope, $mdDialog) {
    $scope.modal = [];
    $scope.modal.place = "";

    $scope.closeToast = function() {
        $mdToast.cancel();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.add = function() {
        $mdDialog.hide($scope.modal.place);
    };
});
