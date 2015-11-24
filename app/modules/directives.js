angular.module('directivesModule', ['angular-storage'])
    .directive('onEnter', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                element.on("keypress", function (evt) {
                    if (evt.which === 13) {
                        // NB: this only works on the no-isolated scope otherwise need to use scope.parent
                        scope.$eval(attr.onEnter);
                    }

                });
            }
        }
    })
    .filter('range', function () {
        return function (n, offset) {
            var res = [];
            for (var i = 0; i < n; i++) {
                res.push(i + offset);
            }
            return res;
        };
    })
    .directive('paginator', ['store', function (store) {
        return {
            restrict: 'E',
            scope: {
                storageKey: '@storageKey',
                urlPage: '@pageUrl',
                numPageLinks: '@',
                pageInfo: '=pageInfo'
            },
            transclude: false,
            templateUrl: '/views/pagination.html',
            controller: function ($scope) {
                return {
                    // move the directive scope to controller
                    PAGE_INCREMENT: 10,
                    numPageLinks: ($scope.numPageLinks === undefined ? 10 : $scope.numPageLinks),
                    pageInfo: $scope.pageInfo,
                    getPageUrl: function (i) {
                        return $scope.urlPage.replace('{:pagenum}', i);                    
                    },
                    setPageSize: function (pgSize){
                        store.set($scope.storageKey + '.PageSize', pgSize);
                        //$scope.apply(function () {
                            $scope.pageInfo.per_page = pgSize;
                        //});
                       
                        console.log(pgSize);
                    }
                };
            },
            controllerAs: 'pg'
        }
    }]);
