// $(function(module) {
//   var beach = {};
var callbackString = function(e) {
  JSON.stringify(e);
};
var today = new Date();

var date = function() {
  today;
  var mm = "0" + (today.getMonth() + 1);
  var day = "0" + (today.getDate());
  var year = today.getFullYear();
  if (mm > 10) {
    mm = today.getMonth() + 1;
    console.log("the month is ", mm);
  } else {
    console.log("month failed");
  }
  if (day > 10) {
    day = today.getDate();
  } else {
    console.log("day failed");
  }
  var newDate = year + mm + day;

  return newDate;
}
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
  jsonUrl;
  $.get(jsonUrl, {
    date: 'today',
    range: 12,
    station: '9447130',
    datum: 'MLW',
    product: 'predictions',
    units: 'english',
    time_zone: 'gmt',
    format: 'json'
  }).done(function(data) {
    console.log('done', data);
    next12 = JSON.parse(data);
  }).fail(function(e) {
    console.log('this is error', e);
  });
 };
 var nextLowTide = function(){
   var lowTide = nextLowTideData();
   console.log(lowTide);
   console.log(lowTide.predictions);
  //  var someName = lowTide.predictions.map(function(){
  //    return t;
  //  });
   console.log('next 12', next12.predictions);
  //  next12.predictions.reduce(function(acc, cur, idx, arr){
  //    console.log();('this is cur',cur);
  //    return cur;
  //  });
 };

var detailData = function() {
  // var tomorrow = new Date();
  // date.setDate(date.getDate() + 1);
  jsonUrl;
  var startDate = date();
  console.log(startDate);
  $.get(jsonUrl, {
    begin_date: startDate,
    range: 72,
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
var dataTomorrow = function(){
  detailData().reduce(function(acc, cur,idx, arr){

  },[])
}
// Need to find next Low Tide, 12 hour increments

var dataTwoDays = function() {
  jsonUrl;
  var startDate = (date()+1);
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
