angular.module('controllersModule', [])
    .controller('searchResultsCtrl', ['$routeParams', '$http', function ($routeParams, $http) {

        var self = this;
        self.pageInfo = {
            per_page: 12,
            current_page: $routeParams.pagenum == null ? 1 : $routeParams.pagenum,
            prev_page: null,
            query: $routeParams.searchterm == null ? 'A' : $routeParams.searchterm, 
            next_page: 1
        };

        self.perpage = 12;

        $http.get(
            'https://www.quandl.com/api/v3/datasets.json?database_code=WIKI&query=' + self.pageInfo.query + '&per_page=' + self.pageInfo.per_page + '&page=' + self.pageInfo.current_page
            ).success(function (data) {
                self.datasets = data.datasets;
                self.pageInfo = data.meta;
            })
            .error(function (e) {console.log(e); });

    }]);