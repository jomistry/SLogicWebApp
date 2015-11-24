angular.module('directivesModule', [])
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
    .directive('paginator', function () {
        return {
            restrict: 'E',
            scope: {
                urlPage: '@pageUrl',
                pageInfo: '=pageInfo'
            },
            transclude: false,
            templateUrl: '/views/pagination.html',
            controller: function ($scope) {
                return {
                    // move the directive scope to controller
                    pageInfo: $scope.pageInfo,
                    getPageUrl: function (i) {
                        return $scope.urlPage.replace('{:pagenum}', i);
                    }
                };
            },
            controllerAs: 'pg'
        }
    });
