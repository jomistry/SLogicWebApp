angular.module('servicesModule', [])
    .factory('quandlDataSvc', ['$http', function ($http) {
        return {
            findDataSets: function (searchWhat, pageNum, numPerPage) {
                if (pageNum === undefined)
                    pageNum = 1;

                if (numPerPage === undefined)
                    numPerPage = 12;

                if (searchWhat === undefined)
                    searchWhat = 'A';

                return $http.get(
                    'https://www.quandl.com/api/v3/datasets.json?api_key=8fH3f6QzDf7TrZdRbiFg&database_code=WIKI&query=' + searchWhat + '&per_page=' + numPerPage + '&page=' + pageNum
                    );
            },

            getDataSet: function (dataSetCode, endDate) {

                if (endDate === undefined)
                    endDate = new Date();

                return $http.get(
                    'https://www.quandl.com/api/v3/datasets/WIKI/' + dataSetCode + '/data.json?api_key=8fH3f6QzDf7TrZdRbiFg&end_date=' + endDate.toISOString().substr(0, 10));
            }

        }

    }]);