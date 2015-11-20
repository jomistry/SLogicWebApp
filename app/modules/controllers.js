angular.module('controllersModule', [])
    .controller('searchResultsCtrl', ['$routeParams', '$http', '$location', function ($routeParams, $http, $location) {

        var self = this;
        self.pageInfo = {
            per_page: 12,
            current_page: $routeParams.pagenum == null ? 1 : $routeParams.pagenum,
            prev_page: null,
            query: $routeParams.searchterm == null ? 'A' : $routeParams.searchterm,
            next_page: 1
        };

        self.perpage = 12;

        self.getData = function () {

            $http.get(
                'https://www.quandl.com/api/v3/datasets.json?api_key=8fH3f6QzDf7TrZdRbiFg&database_code=WIKI&query=' + self.pageInfo.query + '&per_page=' + self.pageInfo.per_page + '&page=' + self.pageInfo.current_page
                ).success(function (data) {
                    self.datasets = data.datasets;
                    self.pageInfo = data.meta;
                })
                .error(function (e) { console.log(e); });
        };

        self.getData();
        
        // only event is passed by keypress, $location needs to be injected in
        self.doSearch = function ($event) {
            if ($event.which === 13) {
                $location.url('/#/' + self.pageInfo.query);
            }
        };

    }])
    .controller('dataSetCtrl', ['$routeParams', '$http',  function ($routeParams, $http) {
        var self = this;
        
        self.code = $routeParams.code == null ? 'AAPL' : $routeParams.code;
        self.endDate = new Date().toISOString().substr(0,10); 
        
        $http.get(
            'https://www.quandl.com/api/v3/datasets/WIKI/' + self.code + '/data.json?api_key=8fH3f6QzDf7TrZdRbiFg&end_date=' + self.endDate
            ).success(function (data) {
                self.dataSet = data.dataset_data;
            })
            .error(function (e) { console.log(e); });    
        
    }]);