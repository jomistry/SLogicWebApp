angular.module('mainApp', ['ngRoute', 'controllersModule', 'ngSanitize'])
    .config(['$routeProvider', function (r) {
        r.when('/', {
            templateUrl: 'views/searchResults.html',
            controller: 'searchResultsCtrl',
            controllerAs: 'searchResults'
        })
<<<<<<< HEAD
        .when('/:searchterm/p/:pagenum', {
=======
        .when('/:searchterm/:pagenum', {
            templateUrl: 'views/searchResults.html',
            controller: 'searchResultsCtrl',
            controllerAs: 'searchResults'
        })      
        .when('/:searchterm', {
>>>>>>> 1d18c57... add paging
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
            controllerAs: 'dataSet'
        })
        .otherwise({ redirectTo: '/' });
    }]);
