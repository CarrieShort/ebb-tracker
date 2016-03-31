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


var detailTideData = function() {
  var today = date();
  console.log(today);

  jsonUrl;
  $.get(jsonUrl, {
    begin_date: today,
    range: 72,
    station: '9447130',
    datum: 'MLW',
    product: 'predictions',
    units: 'english',
    time_zone: 'gmt',
    format: 'json'
  }).done(function(data) {
    // console.log('done', data);
    var tides = JSON.parse(data);
    console.log(tides.predictions);
    detailTides(tides.predictions);
  }).fail(function(e) {
    console.log('this is error', e);
  });
  // next();
};

var detailTides = function(tideArray){
  var tideValue = tideArray.reduce(function(acc, cur, idx, arr){
    // console.log(cur);
    var previousTideIndex = idx -1;
    var nextTideIndex = idx + 1;
    var currentTide = parseFloat(cur.v);

    // console.log('previous Tide Array',arr[previousTide][v]);
    if(previousTideIndex > 0 && nextTideIndex < (arr.length)){
      var previousTide = parseFloat(arr[previousTideIndex].v);
      var nextTide = parseFloat(arr[nextTideIndex].v);
      // console.log(cur.v, idx, previousTide, nextTide, wat.v);
      // console.log(acc);
      // console.log(arr.length);
      if((currentTide < previousTide && currentTide <= nextTide) || (currentTide <= previousTide && currentTide < nextTide)){
        console.log('low tide',currentTide, idx, previousTide, nextTide, cur.t);
        cur.status = 'low';
        acc.push(cur);

      } else if((currentTide > previousTide && currentTide >= nextTide) || (currentTide >= previousTide && currentTide > nextTide)){
        // console.log('high tide',currentTide, idx, previousTide, nextTide, cur.t);
        cur.status = 'high';
        acc.push(cur);
      }
    }
    return acc;

  },[])
  .reduce(function(acc,cur,idx,arr){
    console.log(acc);
    var matchFound = false;
    if (acc.length > 0){
      console.log('array has things in it');
      for(var i = 0; i < acc.length; i++) {
        if(acc[i].v === cur.v){
          console.log('match found',cur);
          matchFound = true;
        }
      }
        // acc.push(cur);
    }
    if (matchFound){
      console.log('match was found don\'t add to array', cur);
    } else {
      console.log(cur, 'was pushed to array');
      acc.push(cur);
    }
    return acc;

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

// var dataTwoDays = function() {
//   jsonUrl;
//   var startDate = (date() + 1);
//   $.get(jsonUrl, {
//     begin_date: startDate,
//     range: 24,
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
// Need to find next Low Tide, 12 hour increments

//   module.beach = beach;
// })(window);
