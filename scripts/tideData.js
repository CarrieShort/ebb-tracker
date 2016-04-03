(function(module) {
  var tideData = {};
  var today = new Date();
  var jsonUrl = '/tides/';

  var date = function() {
    today;
    var mm = today.getMonth() + 1;
    var day = today.getDate();
    var year = today.getFullYear();
    if (mm < 10) {
      mm = '0' + mm;
    }
    if (day < 10) {
      day = '0' + day;
    }
    var newDate = year + mm + day;
    return newDate;
  };

  var timeStamp = function() {
    var hh = today.getHours();
    var mi = today.getMinutes();
    if (hh < 10) {
      hh = '0' + hh;
    }
    if (mi < 10) {
      mi = '0' + mi;
    }
    var newtimeStamp = hh + ':' + mi;
    return newtimeStamp;
  };

  var filterTides = function(tideArray) {
    var tideValue = tideArray.reduce(function(acc, cur, idx, arr) {
      var previousTideIndex = idx - 1;
      var nextTideIndex = idx + 1;
      var currentTide = parseFloat(cur.v);

      var splitDate = cur.t.split(' ');
      cur.time = splitDate[1];
      cur.day = splitDate[0];

      if (previousTideIndex > 0 && nextTideIndex < (arr.length)) {
        var previousTide = parseFloat(arr[previousTideIndex].v);
        var nextTide = parseFloat(arr[nextTideIndex].v);

        if ((currentTide < previousTide && currentTide <= nextTide) || (currentTide <= previousTide && currentTide < nextTide)) {
          cur.status = 'low';
          acc.push(cur);
        } else if ((currentTide > previousTide && currentTide >= nextTide) || (currentTide >= previousTide && currentTide > nextTide)) {
          cur.status = 'high';
          acc.push(cur);
        }
      }
      return acc;
    }, [])
      .reduce(function(acc, cur, idx, arr) {
        var matchFound = false;
        if (acc.length > 0) {
          for (var i = 0; i < acc.length; i++) {
            if (acc[i].v === cur.v) {
              matchFound = true;
            }
          }
        }
        if (matchFound) {} else {
          acc.push(cur);
        }
        return acc;
      }, []);
    return (tideValue);
  };

  tideData.nextLowTideData = function(stationID, idx, ele, callback) {
    var today = date();
    var time = timeStamp();
    $.get(jsonUrl, {
      begin_date: today + ' ' + time,
      range: 14,
      station: stationID,
      datum: 'MLW',
      product: 'predictions',
      units: 'english',
      time_zone: 'lst',
      format: 'json'
    }).done(function(data) {
      var tides = JSON.parse(data);
      indexController.closeBeaches[idx].tideData = filterTides(tides.predictions);
      Beach.all.push(new Beach(ele));
      callback();
      $('.beach-summary').find('.low:first').show();
    }).fail(function(e) {});
  };

  tideData.detailTideData = function(ctx, next) {
    var today = date();
    $.get(jsonUrl, {
      begin_date: today,
      range: 72,
      station: ctx.stationID,
      datum: 'MLW',
      product: 'predictions',
      units: 'english',
      time_zone: 'lst',
      format: 'json'
    }).done(function(data) {
      var tides = JSON.parse(data);
      ctx.tideData = filterTides(tides.predictions);
      next();
    }).fail(function(e) {});
  };

  module.tideData = tideData;
})(window);
