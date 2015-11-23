angular.module('controllersModule', ['servicesModule'])
    .controller('searchResultsCtrl', ['quandlDataSvc', '$routeParams', '$http', '$location', function (quandlSvc, $routeParams, $http, $location) {

        var self = this;

        quandlSvc.findDataSets($routeParams.searchterm, $routeParams.pagenum)
            .success(function (data) {
                self.datasets = data.datasets;
                self.pageInfo = data.meta;
            });
                
        // only event is passed by keypress, $location needs to be injected in
        self.doSearch = function () {
              $location.url('/' + self.pageInfo.query);
        };

    }])
    .controller('dataSetCtrl', ['quandlDataSvc', '$routeParams', '$http', function (quandlSvc, $routeParams, $http) {
        var self = this;

        self.code = $routeParams.code == null ? 'AAPL' : $routeParams.code;
        self.endDate = new Date();
        self.metaData = null;

        quandlSvc.findDataSets(self.code).success(function (data) {
            self.metaData = data.datasets[0];
        });

        quandlSvc.getDataSet(self.code, self.endDate)
            .success(function (data) {
                self.dataSet = data.dataset_data;
            })
            .error(function (e) { console.log(e); });
    }])
    .controller('dummyCtrl', ['$http', function (h) {
        var self = this;
        self.name = 'foo';
        self.doSearch = function () {
            console.log('in controller searh');
            
        self.pageInfo = {
                query: "",
                per_page: 12,
                current_page: 1,
                prev_page: null,
                total_pages: 265,
                total_count: 3173,
                next_page: 2,
                current_first_item: 1,
                current_last_item: 12
                };            
        };
    }]);
