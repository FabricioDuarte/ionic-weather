angular.module('ionicWeather.services').service('WeatherService', function($q, CacheFactory, $http) {

    var apiKey = 'b8966c4ea174842be49f213092e393b2';
    var cacheExpiration = 1000 * 60 * 0.2;

    var self = this;


    var weatherInfoCache = CacheFactory('weatherInfoCache', {
        maxAge: 1 * 60 * 1000,
        deleteOnExpire: 'none',
        storageMode: 'localStorage'
    });

    self.getWeatherInformation = function(place) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + place + '&lang='+ localStorage['lang']+'&units=metric&APPID=' + apiKey
        }).then(function(data) {
            console.log(data);
            deferred.resolve(data.data);
        }, function(error) {
            console.log(error);
            deffered.reject();
        });
        return deferred.promise;
    };

    return self;
});
