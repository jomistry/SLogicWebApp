angular.module('controllersModule', ['servicesModule'])
    .controller('searchResultsCtrl', ['quandlDataSvc', '$routeParams', '$http', '$location', function (quandlSvc, $routeParams, $http, $location) {

        var self = this;

        quandlSvc.findDataSets($routeParams.searchterm, $routeParams.pagenum)
            .success(function (data) {
                self.datasets = data.datasets;
                self.pageInfo = data.meta;
            });
                
        // only event is passed by keypress, $location needs to be injected in
        self.doSearch = function ($event) {
            if ($event.which === 13) {
                $location.url('/' + self.pageInfo.query);
            }
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
    }]);