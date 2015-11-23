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
    .directive('paginator', function () {
        return {
            restrict: 'E',
            scope: {
                urlTemplate: '@',
                pageInfo: '=pi',
            },
            transclude: false,
            templateUrl: '/views/pagination.html',
            controller:function(){
                var self = this;
                self.pages = new Array(10);
                for(var i=1; i<=pi.per_page; i++)
                    self.pages[i] = i;
            },
            controllerAs: 'pg',
            link: function (scope, element, attr) {
                       
            }
        }
    });
