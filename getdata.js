//var returnsCalc = require('./returnsCalc');
var fs = require('fs');
var https = require('https');
var moment = require('moment');


function returnsCalc(js, colName, period, periodType) {

    

    var min = 999999999999;
    var max = -999999999999;
    var minDate = null;
    var maxDate = null;
    var DAY_MILLISECS = 24 * 60 * 60 * 1000;
    var daysInPeriod = 7;


    var colIndex = js.dataset.column_names.indexOf(colName);
    var timeSeries = js.dataset.data;


    while (timeSeries.length > 0) {

        var currentDate = new Date(timeSeries[0][0]);
        var endPeriodDate = moment(currentDate).subtract(period, periodType).toDate();

        var prevIdx = timeSeries.findIndex(
            function isPrevPeriod(item) {
                var itemDate = new Date(item[0]);
                //return (currentDate.getTime() - itemDate.getTime()) / DAY_MILLISECS >= daysInPeriod;
                return itemDate <= endPeriodDate;

            }
            , 7
            )

        if (prevIdx != -1) {
            // Find the point seven days earlier
            // create return
            var pxReturn = timeSeries[0][colIndex] / timeSeries[prevIdx][colIndex] - 1;

            if (pxReturn < min) {
                minDate = timeSeries[0][0];
                min = pxReturn;
            }

            if (pxReturn > max) {
                maxDate = timeSeries[0][0];
                max = pxReturn;
            }

        }

        timeSeries.shift();

    }

    return {
        fieldname: colName,
        min: min * 100,
        minDate: minDate,
        max: max * 100,
        maxDate: maxDate
    };
}

function parseData(datasetName, apiKey, startDate, endDate, periodSpan) {

    var url = 'https://www.quandl.com/api/v3/datasets/WIKI/' + datasetName + ".json"
        + '&' + startDate
        + '&' + startDate
        + '&' + apiKey;

    console.log(url);

    https.get("www.quandl.com/api/v3/datasets/WIKI/FB.json?api_key=8fH3f6QzDf7TrZdRbiFg",
        function (res) {
            console.log("Got response: " + res);
            
            /*            var js = JSON.parse(data);
                        var minmax = returnsCalc(js, 'Adj. Close', periodSpan);
                        console.log(minmax);      */

        }).on('error', function (e) {
            console.log("Got error: " + e.message);
        });
        

}


function processArgs() {
    // get arguments    
    var datasetName = "";
    var apiKey = "";
    var startDate = "";
    var endDate = "";
    var period = "";
    var periodType = "";

    process.argv.forEach(function (val, index, array) {

        if (val.indexOf('api_key=') != -1)
            apiKey = val;

        if (val.indexOf('start_date=') != -1)
            startDate = val;

        if (val.indexOf('end_date=') != -1)
            endDate = val;

        if (val.indexOf('dataset=') != -1)
            datasetName = val.split('=')[1];

        if (val.indexOf('period=') != -1)
            period = val.split('=')[1];

        if (val.indexOf('periodType=') != -1)
            periodType = val.split('=')[1];

        parseData(datasetName, apiKey, startDate, endDate);

    });

}
    
fs.readFile('./AAPL.json', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    var js = JSON.parse(data);
    var minmax = returnsCalc(js, 'Adj. Close', 7, 'days');
    console.log(minmax);
}

);
  
    
