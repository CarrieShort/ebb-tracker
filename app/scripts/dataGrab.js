// $(function(module) {
//   var beach = {};
var callbackString = function(e) {
  JSON.stringify(e);
};
var today = new Date();

var date = function() {
  today;
  var mm = '0' + (today.getMonth() + 1);
  var day = '0' + (today.getDate());
  var year = today.getFullYear();
  if (mm > 10) {
    mm = today.getMonth() + 1;
    console.log('the month is ', mm);
  } else {
    console.log('month failed');
  }
  if (day > 10) {
    day = today.getDate();
  } else {
    console.log('day failed');
  }
  var newDate = year + mm + day;

  return newDate;
};

var timeStamp = function(){
  var hh = '0' + (today.getHours());
  // console.log(hh);
  var mi = '0' + (today.getMinutes());
  // console.log(mi);
  if(hh > 10){
    hh = today.getHours();
  }
  if(mi > 10){
    mi = today.getMinutes();
  }

  var newtimeStamp = hh +':' + mi;

  return newtimeStamp;
};
timeStamp();
var jsonUrl = '/tides/';
var callData = function() {
  jsonUrl;
  $.get(jsonUrl, {
    // end_date: '20120331',
    // range: 48,
    // interval: 'h',
    date: 'today',
    // date: 'latest',
    // range: 12,
    // begin_date: '20130808 08:00',
    // end_date: '20130808 09:00',
    station: '9447130',
    datum: 'MTL',
    product: 'predictions',
    units: 'english',
    time_zone: 'gmt',
    format: 'json'
  }).done(function(data) {
    console.log('done', data);
  }).fail(function(e) {
    console.log('this is error', e);
  });

};

var next12 = {};

// Need to find next Low Tide, 12 hour increments
var nextLowTideData = function() {
  var today = date();
  var time = timeStamp();
  console.log(today);

  jsonUrl;
  $.get(jsonUrl, {
    begin_date: today +' '+ time,
    range: 12,
    station: '9447130',
    datum: 'MLW',
    product: 'predictions',
    units: 'english',
    time_zone: 'gmt',
    format: 'json'
  }).done(function(data) {
    // console.log('done', data);
    next12 = JSON.parse(data);
    nextLowTide();
  }).fail(function(e) {
    console.log('this is error', e);
  });
  // next();
};

var nextLowTide = function() {
  // console.log(next12.predictions);
  var tideValue = next12.predictions.reduce(function(acc, cur, idx, arr){
    // console.log(cur);
    var previousTide = idx -1;
    var nextTide = idx + 1;
    var wat = arr[nextTide];
    // console.log('previous Tide Array',arr[previousTide][v]);
    if(previousTide > 0 && nextTide < (arr.length)){
      // console.log(cur.v, idx, previousTide, nextTide, wat.v);
      // console.log(acc);
      // console.log(arr.length);
      if(parseFloat(cur.v) < parseFloat(arr[previousTide].v) && parseFloat(cur.v) < parseFloat(arr[nextTide].v)){
        // console.log(cur.v, idx, arr[previousTide].v, arr[nextTide].v, cur.t);
        return cur;
      }
    }
  },[]);
  console.log('next 12', next12.predictions);
  //  next12.predictions.reduce(function(acc, cur, idx, arr){
  //    console.log();('this is cur',cur);
  //    return cur;
  //  });
};

// var detailData = function() {
//   // var tomorrow = new Date();
//   // date.setDate(date.getDate() + 1);
//   jsonUrl;
//   var startDate = date();
//   console.log(startDate);
//   $.get(jsonUrl, {
//     begin_date: startDate,
//     range: 72,
//     station: '9447130',
//     datum: 'MLW',
//     product: 'predictions',
//     units: 'english',
//     time_zone: 'gmt',
//     format: 'json'
//   }).done(function(data) {
//     console.log('done', data);
//   }).fail(function(e) {
//     console.log('this is error', e);
//   });
// };
// var dataTomorrow = function() {
//   detailData().reduce(function(acc, cur, idx, arr) {
//
//   }, []);
// };
// Need to find next Low Tide, 12 hour increments

var dataTwoDays = function() {
  jsonUrl;
  var startDate = (date() + 1);
  $.get(jsonUrl, {
    begin_date: startDate,
    range: 24,
    station: '9447130',
    datum: 'MLW',
    product: 'predictions',
    units: 'english',
    time_zone: 'gmt',
    format: 'json'
  }).done(function(data) {
    console.log('done', data);
  }).fail(function(e) {
    console.log('this is error', e);
  });
};
// Need to find next Low Tide, 12 hour increments

//   module.beach = beach;
// })(window);
