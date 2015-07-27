angular.module('ionicWeather.controllers', []);
angular.module('ionicWeather.services', []);
angular.module('ionicWeather.filters', []);
angular.module('ionicWeather', ['ionic', 'ionicWeather.controllers', 'ionicWeather.services', 'ionicWeather.filters', 'ngMaterial', 'angular-cache', 'pascalprecht.translate'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        if(localStorage['lang'] == undefined){
            localStorage['lang'] = 'en';
        }
        if(localStorage['locations'] == undefined){
            var locations = [];
            locations.push({
                name:"Montevideo",
                value: "Montevideo, Uruguay"
            });
            localStorage['locations'] = JSON.stringify(locations);
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, CacheFactoryProvider, $translateProvider) {
    // Angular-cache
    angular.extend(CacheFactoryProvider.defaults, {
        maxAge: 1 * 60 * 1000,
        storageMode: 'localStorage'
    }); //10 minutes

    // Routes
    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })

    .state('app.browse', {
            url: '/browse',
            views: {
                'menuContent': {
                    templateUrl: 'templates/browse.html'
                }
            }
        })
        .state('app.home', {
            url: '/home',
            views: {
                'menuContent': {
                    templateUrl: 'templates/home.html',
                    controller: 'HomeCtrl'
                }
            }
        })
        .state('app.settings', {
            url: '/settings',
            views: {
                'menuContent': {
                    templateUrl: 'templates/settings.html',
                    controller: 'SettingsCtrl'
                }
            }
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');

    // i18n
    $translateProvider.translations('es', {
        SUMMARY: 'Resumen',
        ABOUT: 'Acerca de',
        SETTINGS: 'Ajustes',
        HUMIDITY: 'Humedad',
        PRESSURE: 'Presión',
        TEMP: 'Temperatura',
        TEMP_MAX: 'Máxima',
        TEMP_MIN: 'Mínima',
        WIND: 'Viento',
        LANGUAGE: 'Idioma'
    });

    $translateProvider.translations('en', {
        SUMMARY: 'Summary',
        ABOUT: 'About',
        SETTINGS: 'Settings',
        HUMIDITY: 'Humidity',
        PRESSURE: 'Pressure',
        TEMP: 'Temperature',
        TEMP_MAX: 'Maximum',
        TEMP_MIN: 'Minimum',
        WIND: 'Wind',
        LANGUAGE: 'Language'
    });

    $translateProvider.preferredLanguage(localStorage['lang']);
    
});
