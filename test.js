
var https = require('https')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';



https.get('www.quandl.com/api/v3/datasets/WIKI/AAPL.json?start_date=2010-01-01&end_date=2014-12-3', function (res) {
  console.log('Got response: ' + res.statusCode);
  res.setEncoding('utf8');
  res.on('data', function (data) {
    console.log(data);
  });
})
  .on('error', function (e) {
    console.log('Got error: ' + e.message);
  });


/*
var moment = require('moment');

var startDate = Date.now();
var m = moment(startDate);
var enddate = m.subtract(7, 'days');

console.log(enddate.toDate());
--------------------------------

var https  = require('https')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';



https.get('www.quandl.com/api/v3/datasets/WIKI/AAPL.json?start_date=2010-01-01&end_date=2014-12-3', function(res) {
console.log('Got response: ' + res.statusCode);
res.setEncoding('utf8');
res.on('data', function (data) {
       console.log(data);
  });
})
.on('error', function(e) {
console.log('Got error: ' + e.message);
}); 

------------------------------------
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


https.get('www.quandl.com/api/v3/datasets/WIKI/FB.json?api_key=8fH3f6QzDf7TrZdRbiFg', function(res) {
 console.log('Got response: ' + res);
}).on('error', function(e) {
 console.log('Got error: ' + e.message);
}); 



https.get('http://www.google.com/index.html', function(res) {
  console.log('Got response: ' + res.statusCode);
}).on('error', function(e) {
  console.log('Got error: ' + e.message);
});


https.get('https://www.quandl.com/api/v3/datasets/WIKI/FB/data.csv', function (res){
  console.log('statusCode: ', res.statusCode);
  console.log('headers: ', res.headers);
}).on('error', function(e){
  console.log(e.message);
});
// print process.argv
process.argv.forEach(function(val, index, array) {
  console.log(index + ': ' + val);
});

*/