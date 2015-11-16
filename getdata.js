//var returnsCalc = require('./returnsCalc');
var fs = require('fs');


function returnsCalc(js, colName) {

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

        var prevIdx = timeSeries.findIndex(
            function isPrevPeriod(item) {
                var itemDate = new Date(item[0]);
                return (currentDate.getTime() - itemDate.getTime()) / DAY_MILLISECS >= daysInPeriod;

            }
            , 7
            )
        
        //var prevIdx = getPrevPeriodDateIndex(timeSeries, currIdx, 7);

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

fs.readFile('./AAPL.json', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    var js = JSON.parse(data);
    var minmax = returnsCalc(js, 'Adj. Close');
    console.log(minmax);

}

);
