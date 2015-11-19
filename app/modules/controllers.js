angular.module('controllersModule', [])
    .controller('searchResultsCtrl', ['$routeParams', '$http', function ($routeParams, $http) {

        var self = this;
        self.pageInfo = {
                per_page: 12,
                current_page: 0,
                prev_page: null,
                total_pages: -1,
                total_count: -1,
                next_page: 1
                };
                
        self.perpage = 12;

        $http.get(
                'https://www.quandl.com/api/v3/datasets.json?database_code=WIKI&query=' + $routeParams.searchterm + '&per_page=' +  self.pageInfo.per_page + '&page=' + self.pageInfo.next_page
        ).success(function (data) {
                self.datasets = data.datasets;
                self.pageInfo = data.meta; 
            })
            .error();

    }]);