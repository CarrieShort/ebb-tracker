(function(module) {
  var tideData = {};
  tideData.nextTideResult = [];
  tideData.detailTideResult = [];
  var today = new Date();
  var jsonUrl = '/tides/';

  // helper functions
  // return today's date format YYYYMMDD
  var date = function() {
    today;
    var mm = '0' + (today.getMonth() + 1);
    var day = '0' + (today.getDate());
    var year = today.getFullYear();
    if (mm > 10) {
      mm = today.getMonth() + 1;
    }
    if (day > 10) {
      day = today.getDate();
    }
    var newDate = year + mm + day;
    return newDate;
  };

  // return current time format HH:MM
  var timeStamp = function() {
    var hh = '0' + (today.getHours());
    var mi = '0' + (today.getMinutes());
    if (hh > 10) {
      hh = today.getHours();
    }
    if (mi > 10) {
      mi = today.getMinutes();
    }
    var newtimeStamp = hh + ':' + mi;
    return newtimeStamp;
  };

  // Need to find next Low Tide, 12 hour increments
  tideData.nextLowTideData = function() {
    var today = date();
    var time = timeStamp();
    console.log(today);

    jsonUrl;
    $.get(jsonUrl, {
      begin_date: today + ' ' + time,
      range: 12,
      station: '9447130',
      datum: 'MLW',
      product: 'predictions',
      units: 'english',
      time_zone: 'gmt',
      format: 'json'
    }).done(function(data) {
      // console.log('done', data);
      var tides = JSON.parse(data);
      tideData.nextTideResult = nextLowTide(tides.predictions);
    }).fail(function(e) {
      console.log('this is error', e);
    });
    // next();
  };


  tideData.detailTideData = function() {
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
      // console.log(tides.predictions);
      tideData.detailTideResult = detailTides(tides.predictions);
    }).fail(function(e) {
      console.log('this is error', e);
    });
    // next();
  };

  var detailTides = function(tideArray) {
    var tideValue = tideArray.reduce(function(acc, cur, idx, arr) {
      // console.log(cur);
      var previousTideIndex = idx - 1;
      var nextTideIndex = idx + 1;
      var currentTide = parseFloat(cur.v);

      // console.log('previous Tide Array',arr[previousTide][v]);
      if (previousTideIndex > 0 && nextTideIndex < (arr.length)) {
        var previousTide = parseFloat(arr[previousTideIndex].v);
        var nextTide = parseFloat(arr[nextTideIndex].v);
        // console.log(cur.v, idx, previousTide, nextTide, wat.v);
        // console.log(acc);
        // console.log(arr.length);
        if ((currentTide < previousTide && currentTide <= nextTide) || (currentTide <= previousTide && currentTide < nextTide)) {
          // console.log('low tide', currentTide, idx, previousTide, nextTide, cur.t);
          cur.status = 'low';
          acc.push(cur);

        } else if ((currentTide > previousTide && currentTide >= nextTide) || (currentTide >= previousTide && currentTide > nextTide)) {
          // console.log('high tide',currentTide, idx, previousTide, nextTide, cur.t);
          cur.status = 'high';
          acc.push(cur);
        }
      }
      return acc;

    }, [])
    .reduce(function(acc, cur, idx, arr) {
      // console.log(acc);
      var matchFound = false;
      if (acc.length > 0) {
        // console.log('array has things in it');
        for (var i = 0; i < acc.length; i++) {
          if (acc[i].v === cur.v) {
            // console.log('match found', cur);
            matchFound = true;
          }
        }
        // acc.push(cur);
      }
      if (matchFound) {
        // console.log('match was found don\'t add to array', cur);
      } else {
        // console.log(cur, 'was pushed to array');
        acc.push(cur);
      }
      return acc;

    }, []);
    console.log(tideValue);
  };
  var nextLowTide = function(tideArray) {
    var tideValue = tideArray.reduce(function(acc, cur, idx, arr){
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
          acc.push(cur);
        }
      }
      return acc;
    },[]);
    console.log(tideValue);
    return tideValue;
  };

  module.tideData = tideData;
})(window);
