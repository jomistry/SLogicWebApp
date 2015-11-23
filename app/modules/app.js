angular.module('mainApp', ['ngRoute', 'controllersModule', 'ngSanitize'])
    .config(['$routeProvider', function (r) {
        r.when('/', {
            templateUrl: 'views/searchResults.html',
            controller: 'searchResultsCtrl',
            controllerAs: 'searchResults'
        })
        .when('/:searchterm/p/:pagenum', {
            templateUrl: 'views/searchResults.html',
            controller: 'searchResultsCtrl',
            controllerAs: 'searchResults'
        })
        .when('/:searchterm', {
            templateUrl: 'views/searchResults.html',
            controller: 'searchResultsCtrl',
            controllerAs: 'searchResults'
        })
        .when('/ds/:code', {
            templateUrl: 'views/dataSet.html',
            controller: 'dataSetCtrl',
            controllerAs: 'dataSetCtrl'
        })
        .otherwise({ redirectTo: '/' });
    }]);
