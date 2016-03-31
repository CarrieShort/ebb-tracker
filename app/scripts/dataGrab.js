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

  // return array of filtered results
  var filterDetailTides = function(tideArray) {
    var tideValue = tideArray.reduce(function(acc, cur, idx, arr) {
      var previousTideIndex = idx - 1;
      var nextTideIndex = idx + 1;
      var currentTide = parseFloat(cur.v);

      if (previousTideIndex > 0 && nextTideIndex < (arr.length)) {
        var previousTide = parseFloat(arr[previousTideIndex].v);
        var nextTide = parseFloat(arr[nextTideIndex].v);

        if ((currentTide < previousTide && currentTide <= nextTide) || (currentTide <= previousTide && currentTide < nextTide)) {
          cur.status = 'low';
          var splitDate = cur.t.split(' ');
          cur.time = splitDate[1];
          cur.day = splitDate[0];
          acc.push(cur);
        } else if ((currentTide > previousTide && currentTide >= nextTide) || (currentTide >= previousTide && currentTide > nextTide)) {
          cur.status = 'high';
          var splitDate = cur.t.split(' ');
          cur.time = splitDate[1];
          cur.day = splitDate[0];
          acc.push(cur);
        }
      }
      return acc;
    }, [])
    .reduce(function(acc, cur, idx, arr) {
      var matchFound = false;
      if (acc.length > 0) {
        for (var i = 0; i < acc.length; i++) {
          if (acc[i].v === cur.v && acc[i].day === cur.day) {
            matchFound = true;
          }
        }
      }
      if (matchFound) {
      } else {
        acc.push(cur);
      }
      return acc;
    }, []);
    return(tideValue);
  };

  // return array of filtered results
  var filterNextLowTide = function(tideArray) {
    var tideValue = tideArray.reduce(function(acc, cur, idx, arr){
      var previousTide = idx -1;
      var nextTide = idx + 1;

      if(previousTide > 0 && nextTide < (arr.length)){
        if(parseFloat(cur.v) < parseFloat(arr[previousTide].v) && parseFloat(cur.v) < parseFloat(arr[nextTide].v)){
          acc.push(cur);
        }
      }
      return acc;
    },[]);
    return tideValue;
  };

  // Need to find next Low Tide, 12 hour increments
  tideData.nextLowTideData = function(ctx,next) {
    var today = date();
    var time = timeStamp();
    console.log(today);
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
      var tides = JSON.parse(data);
      tideData.nextTideResult = filterNextLowTide(tides.predictions);
    }).fail(function(e) {
      console.log('this is error', e);
    });
  };

  // return high and low tides over next 72 hours from start date
  tideData.detailTideData = function(ctx,next) {
    var today = date();
    console.log(today);
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
      var tides = JSON.parse(data);
      tideData.detailTideResult = filterDetailTides(tides.predictions);
    }).fail(function(e) {
      console.log('this is error', e);
    });
  };

  module.tideData = tideData;
})(window);
