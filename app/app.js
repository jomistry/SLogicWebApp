angular.module('mainApp',['ngRoute'])
.config(['$routeProvider', function (r) {
    r
    .when('/', {
        templateUrl: 'views/searchResults.html'
    })
    .otherwise({redirectTo: '/'});   
}]);
