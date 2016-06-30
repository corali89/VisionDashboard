/**
 * Created by Corali Triana on 4/17/16.
 */

(function () {
    'use strict';
    angular.module('LoginApp', []);
    angular.module('ReplenishmentApp', []);
    angular.module('LoyaltyApp', []);
    angular.module('FittingRoomApp', []);
    angular
        .module('MainApp', [
            'LoginApp',
            'ReplenishmentApp',
            'LoyaltyApp',
            'FittingRoomApp',
            'datatables',
            'ngCookies',
            'ui.router',
            'ui.bootstrap'
        ])
        .config(config)
        .run(run);

    config.$inject=['$stateProvider', '$urlRouterProvider'];//, 'ChartJsProvider'];
    function config($stateProvider, $urlRouterProvider ) {
       // ChartJsProvider.setOptions({ colours : ['#d9534f'] });
        $stateProvider
            .state('login', {
                url: "/login",
                controller: 'LoginController',
                templateUrl: "app/components/Login/Login.html"
            })
            .state('layout', {
                url: "/dashboard",
                templateUrl: "app/components/Layout/Layout.html",
            })
            .state('layout.replenishment', {
                url: "/replenishment",
                controller: 'ReplenishmentController',
                templateUrl: "app/components/Replenishment/dashboard.html"
            })
            .state('layout.loyalty', {
                url: "/loyalty",
                controller: 'LoyaltyController',
                templateUrl: "app/components/Loyalty/dashboard.html"
            })
            .state('layout.fittingRoom', {
                url: "/fittingRoom",
                controller: 'FittingRoomController',
                templateUrl: "app/components/FittingRoom/dashboard.html"
            });
        $urlRouterProvider.otherwise("dashboard/replenishment");

    }
    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        $rootScope.IsOwner = $cookieStore.get('IsOwner');
        $rootScope.IsRegionalManager = $cookieStore.get('IsRegionalManager');
        $rootScope.IsManager = $cookieStore.get('IsManager');
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });

    }
})();